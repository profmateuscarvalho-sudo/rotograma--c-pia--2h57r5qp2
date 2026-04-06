import { RiskEvent, RiskLevel, RiskType, RouteRiskLevel } from '@/types'
import { LEVEL_THRESHOLDS, ROUTE_LEVEL_THRESHOLDS } from './constants'

export const calculateEventScore = (event: RiskEvent, catalog: RiskType[]): number => {
  if (!event || !catalog) return 0
  const riskType = catalog.find((r) => r?.id === event?.riskTypeId)
  if (!riskType) return 0

  const weight = riskType.baseWeight
  let points = 0

  if (typeof weight === 'string') {
    const w = weight.toLowerCase()
    if (w.includes('baixo')) points = 10
    else if (w.includes('médio') || w.includes('medio')) points = 25
    else if (w.includes('alto')) points = 45
    else if (w.includes('crítico') || w.includes('critico')) points = 95
    else points = Number(weight)
  } else {
    if (weight === 1) points = 10
    else if (weight === 2) points = 25
    else if (weight === 3) points = 45
    else if (weight === 4) points = 95
    else points = Number(weight)
  }

  return isNaN(points) ? 10 : points
}

export const calculateSegmentScore = (
  segmentId: string,
  events: RiskEvent[],
  catalog: RiskType[],
): number => {
  if (!events || !segmentId) return 0
  const segmentEvents = events.filter((e) => e?.segmentId === segmentId)
  return segmentEvents.reduce((total, event) => total + calculateEventScore(event, catalog), 0)
}

export const getRiskLevel = (score: number): RiskLevel => {
  const s = Number(score) || 0
  if (s <= LEVEL_THRESHOLDS.BAIXO) return 'Baixo'
  if (s <= LEVEL_THRESHOLDS.MEDIO) return 'Médio'
  if (s <= LEVEL_THRESHOLDS.ALTO) return 'Alto'
  return 'Crítico'
}

export const getRouteRiskLevel = (score: number): RouteRiskLevel => {
  const s = Number(score) || 0
  if (s === 0) return 'Sem Riscos'
  if (s <= ROUTE_LEVEL_THRESHOLDS.BAIXO) return 'Baixo'
  if (s <= ROUTE_LEVEL_THRESHOLDS.MEDIO) return 'Médio'
  if (s <= ROUTE_LEVEL_THRESHOLDS.ALTO) return 'Alto'
  return 'Crítico'
}

export const getRouteRiskDescription = (level: RouteRiskLevel): string => {
  switch (level) {
    case 'Baixo':
      return 'Risco aceitável (Nível 1). Probabilidade muito baixa de acidentes graves. As condições gerais da via são adequadas para o tráfego regular.'
    case 'Médio':
      return 'Atenção requerida (Nível 2). Presença de fatores de risco moderados que demandam condução defensiva e observação atenta do motorista.'
    case 'Alto':
      return 'Risco considerável (Nível 3). Condições adversas na via ou entorno que exigem alto nível de alerta e possíveis medidas de mitigação.'
    case 'Crítico':
      return 'Severidade máxima (Nível 4). Múltiplos fatores de risco severos ou perigos iminentes detectados no trajeto. Intervenção ou revisão de rota fortemente recomendada.'
    default:
      return 'Nível não classificado.'
  }
}

export const getRouteRiskColor = (level: RouteRiskLevel): string => {
  switch (level) {
    case 'Sem Riscos':
      return 'bg-slate-100 text-slate-600 border-slate-200'
    case 'Baixo':
      return 'bg-green-500 text-white border-green-600'
    case 'Médio':
      return 'bg-yellow-500 text-white border-yellow-600'
    case 'Alto':
      return 'bg-orange-500 text-white border-orange-600'
    case 'Crítico':
      return 'bg-red-600 text-white border-red-700'
    default:
      return 'bg-slate-200 text-slate-800'
  }
}

export const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case 'Baixo':
      return 'bg-emerald-500 text-white'
    case 'Médio':
      return 'bg-yellow-500 text-white'
    case 'Alto':
      return 'bg-amber-500 text-white'
    case 'Crítico':
      return 'bg-red-600 text-white'
    default:
      return 'bg-slate-200 text-slate-800'
  }
}

export const getRiskColorHex = (level: RiskLevel): string => {
  switch (level) {
    case 'Baixo':
      return '#10b981'
    case 'Médio':
      return '#eab308'
    case 'Alto':
      return '#f59e0b'
    case 'Crítico':
      return '#dc2626'
    default:
      return '#e2e8f0'
  }
}

export const getRiskWeightStyles = (weight: number | string, active: boolean) => {
  let normalizedWeight = 1
  if (typeof weight === 'string') {
    const w = weight.toLowerCase()
    if (w.includes('baixo')) normalizedWeight = 1
    else if (w.includes('médio') || w.includes('medio')) normalizedWeight = 2
    else if (w.includes('alto')) normalizedWeight = 3
    else if (w.includes('crítico') || w.includes('critico')) normalizedWeight = 4
    else normalizedWeight = Number(weight)
  } else {
    if (weight === 10 || weight === 15) normalizedWeight = 1
    else if (weight === 25 || weight === 30) normalizedWeight = 2
    else if (weight === 45 || weight === 50) normalizedWeight = 3
    else if (weight >= 90) normalizedWeight = 4
    else normalizedWeight = Number(weight)
  }

  switch (normalizedWeight) {
    case 1:
      return active
        ? 'bg-green-500 border-green-600 text-white'
        : 'bg-green-50 border-green-200 text-green-700'
    case 2:
      return active
        ? 'bg-yellow-500 border-yellow-600 text-white'
        : 'bg-yellow-50 border-yellow-200 text-yellow-700'
    case 3:
      return active
        ? 'bg-orange-500 border-orange-600 text-white'
        : 'bg-orange-50 border-orange-200 text-orange-700'
    case 4:
      return active
        ? 'bg-red-600 border-red-700 text-white'
        : 'bg-red-50 border-red-200 text-red-700'
    default:
      return active
        ? 'bg-slate-500 border-slate-600 text-white'
        : 'bg-slate-50 border-slate-200 text-slate-700'
  }
}

export const getRiskWeightLevelName = (weight: number | string): string => {
  if (typeof weight === 'string') {
    const w = weight.toLowerCase()
    if (w.includes('baixo')) return 'Baixo'
    if (w.includes('médio') || w.includes('medio')) return 'Médio'
    if (w.includes('alto')) return 'Alto'
    if (w.includes('crítico') || w.includes('critico')) return 'Crítico'
  }
  const wNum = Number(weight)
  if (wNum === 1 || (wNum > 0 && wNum <= 15)) return 'Baixo'
  if (wNum === 2 || (wNum > 15 && wNum <= 30)) return 'Médio'
  if (wNum === 3 || (wNum > 30 && wNum <= 50)) return 'Alto'
  if (wNum === 4 || wNum > 50) return 'Crítico'
  return 'Baixo'
}
