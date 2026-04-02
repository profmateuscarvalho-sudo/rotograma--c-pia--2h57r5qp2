import { useEffect, useState, useRef } from 'react'
import { useAppStore } from '@/store/AppContext'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export const useSync = () => {
  const { state, markAsSynced } = useAppStore()
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
          let photoUrl = event.photoUrl
          let audioUrl = event.audioUrl

          if (photoUrl?.startsWith('data:image')) {
            const res = await fetch(photoUrl)
            const blob = await res.blob()
            const path = `${user.id}/events/${event.id}_photo.jpg`
            await supabase.storage.from('media').upload(path, blob, { upsert: true })
            const { data } = supabase.storage.from('media').getPublicUrl(path)
            photoUrl = data.publicUrl
          }

          if (audioUrl?.startsWith('blob:')) {
            const res = await fetch(audioUrl)
            const blob = await res.blob()
            const path = `${user.id}/events/${event.id}_audio.webm`
            await supabase.storage.from('media').upload(path, blob, { upsert: true })
            const { data } = supabase.storage.from('media').getPublicUrl(path)
            audioUrl = data.publicUrl
          }

          const { error } = await supabase.from('events').upsert({
            id: event.id,
            user_id: user.id,
            route_id: event.routeId,
            segment_id: event.segmentId,
            risk_type_id: event.riskTypeId,
            timestamp: event.timestamp,
            note: event.note || null,
            photo_url: photoUrl || null,
            audio_url: audioUrl || null,
            video_timestamp: event.videoTimestamp || null,
          })
          if (!error) syncedEvents.push(event.id)
        }

        for (const obs of pendingObservations) {
          let audioUrl = obs.audioUrl

          if (audioUrl?.startsWith('blob:')) {
            const res = await fetch(audioUrl)
            const blob = await res.blob()
            const path = `${user.id}/observations/${obs.id}_audio.webm`
            await supabase.storage.from('media').upload(path, blob, { upsert: true })
            const { data } = supabase.storage.from('media').getPublicUrl(path)
            audioUrl = data.publicUrl
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
          if (!error) syncedObservations.push(obs.id)
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
