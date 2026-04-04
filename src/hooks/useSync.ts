import { useEffect, useState, useRef } from 'react'
import { useAppStore } from '@/store/AppContext'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { getMedia, deleteMedia } from '@/lib/idb'

export const useSync = () => {
  const { state, markAsSynced, updateEvent, updateObservation } = useAppStore() as any
  const { user } = useAuth()
  const [isSyncing, setIsSyncing] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const isSyncingRef = useRef(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (!isOnline || !user) return

    const pendingRoutes = (state.routes as any[]).filter((r) => r.synced === false)
    const pendingSegments = (state.segments as any[]).filter((s) => s.synced === false)
    const pendingEvents = state.events.filter((e) => e.synced === false)
    const pendingObservations = (state.observations || ([] as any[])).filter(
      (o) => o.synced === false,
    )

    if (
      !pendingRoutes.length &&
      !pendingSegments.length &&
      !pendingEvents.length &&
      !pendingObservations.length
    )
      return

    const syncData = async () => {
      if (isSyncingRef.current) return
      isSyncingRef.current = true
      setIsSyncing(true)

      const syncedRoutes: string[] = []
      const syncedSegments: string[] = []
      const syncedEvents: string[] = []
      const syncedObservations: string[] = []

      try {
        for (const route of pendingRoutes) {
          const { error } = await supabase.from('routes').upsert({
            id: route.id,
            user_id: user.id,
            name: route.name,
            origin: route.origin,
            destination: route.destination,
            evaluator: route.evaluator,
            date: route.date,
            status: route.status,
          })
          if (!error) syncedRoutes.push(route.id)
        }

        for (const segment of pendingSegments) {
          const { error } = await supabase.from('segments').upsert({
            id: segment.id,
            user_id: user.id,
            route_id: segment.routeId,
            number: segment.number,
            start_km: segment.startKm,
            end_km: segment.endKm,
          })
          if (!error) syncedSegments.push(segment.id)
        }

        for (const event of pendingEvents) {
          let rawPhotoUrl = event.photoUrl || (event as any).photo_url
          let photoUrls: string[] = []

          if (Array.isArray(event.photoUrls) && event.photoUrls.length > 0) {
            photoUrls = event.photoUrls
          } else if (
            Array.isArray((event as any).photo_urls) &&
            (event as any).photo_urls.length > 0
          ) {
            photoUrls = (event as any).photo_urls
          } else if (rawPhotoUrl && typeof rawPhotoUrl === 'string') {
            photoUrls = rawPhotoUrl.split(',').filter(Boolean)
          }

          let audioUrl = event.audioUrl || (event as any).audio_url

          const syncedPhotoUrls: string[] = []

          for (let i = 0; i < photoUrls.length; i++) {
            let pUrl = photoUrls[i]
            if (pUrl?.startsWith('idb://')) {
              try {
                const key = pUrl.replace('idb://', '')
                const data = await getMedia(key)
                let blob: Blob
                if (data instanceof Blob) {
                  blob = data
                } else if (typeof data === 'string' && data.startsWith('data:image')) {
                  blob = await (await fetch(data)).blob()
                } else {
                  syncedPhotoUrls.push(pUrl)
                  continue
                }
                const path = `${user.id}/events/${event.id}_photo_${i}_${Date.now()}.jpg`
                await supabase.storage.from('media').upload(path, blob, { upsert: true })
                const { data: pubData } = supabase.storage.from('media').getPublicUrl(path)
                syncedPhotoUrls.push(pubData.publicUrl)
                await deleteMedia(key)
              } catch (e) {
                console.error('Failed to upload IDB photo', e)
                syncedPhotoUrls.push(pUrl)
              }
            } else if (pUrl?.startsWith('data:image') || pUrl?.startsWith('blob:')) {
              try {
                const res = await fetch(pUrl)
                const blob = await res.blob()
                const path = `${user.id}/events/${event.id}_photo_${i}_${Date.now()}.jpg`
                await supabase.storage.from('media').upload(path, blob, { upsert: true })
                const { data } = supabase.storage.from('media').getPublicUrl(path)
                syncedPhotoUrls.push(data.publicUrl)
              } catch (e) {
                console.error('Failed to upload photo', e)
                syncedPhotoUrls.push(pUrl) // fallback
              }
            } else {
              syncedPhotoUrls.push(pUrl)
            }
          }

          const finalPhotoUrl = syncedPhotoUrls[0] || null

          if (audioUrl?.startsWith('idb://')) {
            try {
              const key = audioUrl.replace('idb://', '')
              const data = await getMedia(key)
              let blob: Blob
              if (data instanceof Blob) {
                blob = data
              } else if (typeof data === 'string' && data.startsWith('data:')) {
                blob = await (await fetch(data)).blob()
              } else {
                blob = new Blob([]) // fallback
              }
              const path = `${user.id}/events/${event.id}_audio_${Date.now()}.webm`
              await supabase.storage.from('media').upload(path, blob, { upsert: true })
              const { data: pubData } = supabase.storage.from('media').getPublicUrl(path)
              audioUrl = pubData.publicUrl
              await deleteMedia(key)
            } catch (e) {
              console.error('Failed to upload IDB audio', e)
            }
          } else if (audioUrl?.startsWith('blob:') || audioUrl?.startsWith('data:')) {
            try {
              const res = await fetch(audioUrl)
              const blob = await res.blob()
              const path = `${user.id}/events/${event.id}_audio_${Date.now()}.webm`
              await supabase.storage.from('media').upload(path, blob, { upsert: true })
              const { data } = supabase.storage.from('media').getPublicUrl(path)
              audioUrl = data.publicUrl
            } catch (e) {
              console.error('Failed to upload audio', e)
            }
          }

          const { error } = await supabase.from('events').upsert({
            id: event.id,
            user_id: user.id,
            route_id: event.routeId,
            segment_id: event.segmentId,
            risk_type_id: event.riskTypeId,
            timestamp: event.timestamp,
            note: event.note || null,
            photo_url: finalPhotoUrl,
            photo_urls: syncedPhotoUrls,
            audio_url: audioUrl || null,
            video_timestamp: event.videoTimestamp || null,
          })
          if (!error) {
            syncedEvents.push(event.id)
            if (updateEvent) {
              updateEvent(event.id, {
                photoUrl: syncedPhotoUrls.join(',') || undefined,
                photoUrls: syncedPhotoUrls,
                audioUrl: audioUrl || undefined,
                synced: true,
              })
            }
          }
        }

        for (const obs of pendingObservations) {
          let audioUrl = obs.audioUrl

          if (audioUrl?.startsWith('idb://')) {
            try {
              const key = audioUrl.replace('idb://', '')
              const data = await getMedia(key)
              let blob: Blob
              if (data instanceof Blob) {
                blob = data
              } else if (typeof data === 'string' && data.startsWith('data:')) {
                blob = await (await fetch(data)).blob()
              } else {
                blob = new Blob([])
              }
              const path = `${user.id}/observations/${obs.id}_audio_${Date.now()}.webm`
              await supabase.storage.from('media').upload(path, blob, { upsert: true })
              const { data: pubData } = supabase.storage.from('media').getPublicUrl(path)
              audioUrl = pubData.publicUrl
              await deleteMedia(key)
            } catch (e) {
              console.error('Failed to upload obs IDB audio', e)
            }
          } else if (audioUrl?.startsWith('blob:') || audioUrl?.startsWith('data:')) {
            try {
              const res = await fetch(audioUrl)
              const blob = await res.blob()
              const path = `${user.id}/observations/${obs.id}_audio_${Date.now()}.webm`
              await supabase.storage.from('media').upload(path, blob, { upsert: true })
              const { data } = supabase.storage.from('media').getPublicUrl(path)
              audioUrl = data.publicUrl
            } catch (e) {
              console.error('Failed to upload obs audio', e)
            }
          }

          const { error } = await supabase.from('observations').upsert({
            id: obs.id,
            user_id: user.id,
            route_id: obs.routeId,
            segment_id: obs.segmentId,
            note: obs.note || null,
            audio_url: audioUrl || null,
            video_timestamp: obs.videoTimestamp || null,
            timestamp: obs.timestamp,
          })
          if (!error) {
            syncedObservations.push(obs.id)
            if (updateObservation) {
              updateObservation(obs.id, {
                audioUrl: audioUrl || undefined,
                synced: true,
              })
            }
          }
        }
      } catch (err) {
        console.error('Sync failed', err)
      }

      if (syncedRoutes.length) markAsSynced('routes', syncedRoutes)
      if (syncedSegments.length) markAsSynced('segments', syncedSegments)
      if (syncedEvents.length) markAsSynced('events', syncedEvents)
      if (syncedObservations.length) markAsSynced('observations', syncedObservations)

      setIsSyncing(false)
      isSyncingRef.current = false
    }

    const timeout = setTimeout(syncData, 2000)
    return () => clearTimeout(timeout)
  }, [state, isOnline, user, markAsSynced])

  const pendingCount =
    (state.routes as any[]).filter((r) => r.synced === false).length +
    (state.segments as any[]).filter((s) => s.synced === false).length +
    state.events.filter((e) => e.synced === false).length +
    (state.observations || []).filter((o) => (o as any).synced === false).length

  return { isSyncing, isOnline, pendingCount }
}
