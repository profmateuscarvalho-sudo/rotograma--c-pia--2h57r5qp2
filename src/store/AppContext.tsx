import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppState, RiskEvent, RiskType, Route, Segment, Observation } from '@/types'
import { DEFAULT_CATALOG } from '@/lib/constants'
import { useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'

interface AppContextType {
  state: AppState
  addRoute: (route: Route, segments: Segment[]) => void
  removeRoute: (id: string) => void
  addEvent: (event: RiskEvent) => void
  updateEvent: (id: string, updates: Partial<RiskEvent>) => void
  removeEvent: (id: string) => void
  updateSegment: (id: string, updates: Partial<Segment>) => void
  completeRoute: (id: string) => void
  updateCatalog: (catalog: RiskType[]) => void
  addCatalogRisk: (risk: RiskType) => void
  updateCatalogRisk: (id: string, updates: Partial<RiskType>) => void
  removeCatalogRisk: (id: string) => void
  addObservation: (observation: Observation) => void
  markAsSynced: (type: 'routes' | 'segments' | 'events' | 'observations', ids: string[]) => void
  clearData: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialState: AppState = {
  routes: [],
  segments: [],
  events: [],
  catalog: DEFAULT_CATALOG,
  observations: [],
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('rotograma_state')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure catalog meets the new minimum structure requirements (at least 24 items)
        if (!parsed.catalog || parsed.catalog.length < 24) {
          parsed.catalog = DEFAULT_CATALOG
        }
        return { ...initialState, ...parsed }
      }
    } catch (e) {
      console.error('Failed to load state', e)
    }
    return initialState
  })

  const { user } = useAuth()

  const fetchRemoteData = useCallback(async () => {
    if (!user) return
    try {
      const [routesRes, segmentsRes, eventsRes, obsRes] = await Promise.all([
        supabase.from('routes').select('*'),
        supabase.from('segments').select('*'),
        supabase.from('events').select('*'),
        supabase.from('observations').select('*'),
      ])

      if (!routesRes.error && !segmentsRes.error && !eventsRes.error && !obsRes.error) {
        const remoteRoutes = routesRes.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          origin: r.origin,
          destination: r.destination,
          evaluator: r.evaluator,
          date: r.date,
          status: r.status,
          synced: true,
        }))
        const remoteSegments = segmentsRes.data.map((s: any) => ({
          id: s.id,
          routeId: s.route_id,
          number: s.number,
          startKm: s.start_km,
          endKm: s.end_km,
          synced: true,
        }))
        const remoteEvents = eventsRes.data.map((e: any) => ({
          id: e.id,
          routeId: e.route_id,
          segmentId: e.segment_id,
          riskTypeId: e.risk_type_id,
          timestamp: e.timestamp,
          note: e.note,
          photoUrl: e.photo_url,
          audioUrl: e.audio_url,
          videoTimestamp: e.video_timestamp,
          synced: true,
        }))
        const remoteObs = obsRes.data.map((o: any) => ({
          id: o.id,
          routeId: o.route_id,
          segmentId: o.segment_id,
          note: o.note,
          audioUrl: o.audio_url,
          videoTimestamp: o.video_timestamp,
          timestamp: o.timestamp,
          synced: true,
        }))

        setState((prev) => {
          const merge = (local: any[], remote: any[]) => {
            const localMap = new Map(local.map((i) => [i.id, i]))
            remote.forEach((r) => {
              const l = localMap.get(r.id)
              if (!l || l.synced !== false) localMap.set(r.id, r)
            })
            return Array.from(localMap.values())
          }
          return {
            ...prev,
            routes: merge(prev.routes, remoteRoutes),
            segments: merge(prev.segments, remoteSegments),
            events: merge(prev.events, remoteEvents),
            observations: merge(prev.observations || [], remoteObs),
          }
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [user])

  useEffect(() => {
    if (user) fetchRemoteData()
  }, [user, fetchRemoteData])

  useRealtime('routes', fetchRemoteData, !!user)
  useRealtime('segments', fetchRemoteData, !!user)
  useRealtime('events', fetchRemoteData, !!user)
  useRealtime('observations', fetchRemoteData, !!user)

  useEffect(() => {
    localStorage.setItem('rotograma_state', JSON.stringify(state))
  }, [state])

  const addRoute = (route: Route, segments: Segment[]) => {
    setState((prev) => ({
      ...prev,
      routes: [{ ...route, synced: false }, ...prev.routes],
      segments: [...prev.segments, ...segments.map((s) => ({ ...s, synced: false }))],
    }))
  }

  const removeRoute = (id: string) => {
    setState((prev) => ({
      ...prev,
      routes: prev.routes.filter((r) => r.id !== id),
      segments: prev.segments.filter((s) => s.routeId !== id),
      events: prev.events.filter((e) => e.routeId !== id),
      observations: prev.observations?.filter((o) => o.routeId !== id) || [],
    }))
    if (user) supabase.from('routes').delete().eq('id', id).then()
  }

  const addEvent = (event: RiskEvent) => {
    setState((prev) => ({ ...prev, events: [...prev.events, { ...event, synced: false }] }))
  }

  const updateEvent = (id: string, updates: Partial<RiskEvent>) => {
    setState((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updates, synced: false } : e)),
    }))
  }

  const removeEvent = (id: string) => {
    setState((prev) => ({ ...prev, events: prev.events.filter((e) => e.id !== id) }))
    if (user) supabase.from('events').delete().eq('id', id).then()
  }

  const updateSegment = (id: string, updates: Partial<Segment>) => {
    setState((prev) => ({
      ...prev,
      segments: prev.segments.map((s) => (s.id === id ? { ...s, ...updates, synced: false } : s)),
    }))
  }

  const completeRoute = (id: string) => {
    setState((prev) => ({
      ...prev,
      routes: prev.routes.map((r) =>
        r.id === id ? { ...r, status: 'concluido', synced: false } : r,
      ),
    }))
  }

  const updateCatalog = (catalog: RiskType[]) => {
    setState((prev) => ({ ...prev, catalog }))
  }

  const addCatalogRisk = (risk: RiskType) => {
    setState((prev) => ({ ...prev, catalog: [...prev.catalog, risk] }))
  }

  const updateCatalogRisk = (id: string, updates: Partial<RiskType>) => {
    setState((prev) => ({
      ...prev,
      catalog: prev.catalog.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }))
  }

  const removeCatalogRisk = (id: string) => {
    setState((prev) => ({
      ...prev,
      catalog: prev.catalog.filter((r) => r.id !== id),
    }))
  }

  const addObservation = (observation: Observation) => {
    setState((prev) => ({
      ...prev,
      observations: [...(prev.observations || []), { ...observation, synced: false }],
    }))
  }

  const markAsSynced = useCallback(
    (type: 'routes' | 'segments' | 'events' | 'observations', ids: string[]) => {
      setState((prev) => {
        const updated = { ...prev }
        if (type === 'routes') {
          updated.routes = prev.routes.map((r) => (ids.includes(r.id) ? { ...r, synced: true } : r))
        } else if (type === 'segments') {
          updated.segments = prev.segments.map((s) =>
            ids.includes(s.id) ? { ...s, synced: true } : s,
          )
        } else if (type === 'events') {
          updated.events = prev.events.map((e) => (ids.includes(e.id) ? { ...e, synced: true } : e))
        } else if (type === 'observations') {
          updated.observations = (prev.observations || []).map((o) =>
            ids.includes(o.id) ? { ...o, synced: true } : o,
          )
        }
        return updated
      })
    },
    [],
  )

  const clearData = () => {
    setState(initialState)
  }

  return (
    <AppContext.Provider
      value={{
        state,
        addRoute,
        removeRoute,
        addEvent,
        updateEvent,
        removeEvent,
        updateSegment,
        completeRoute,
        updateCatalog,
        addCatalogRisk,
        updateCatalogRisk,
        removeCatalogRisk,
        addObservation,
        markAsSynced,
        clearData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore must be used within AppProvider')
  return context
}
