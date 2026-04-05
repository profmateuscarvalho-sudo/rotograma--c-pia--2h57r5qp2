import React from 'react'

export function RiskLevelLegend() {
  return (
    <div className="bg-slate-50 border rounded-lg p-3 flex flex-wrap items-center justify-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="font-medium text-slate-700">Baixo: 0-25 pts</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span className="font-medium text-slate-700">Médio: 26-50 pts</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <span className="font-medium text-slate-700">Alto: 51-90 pts</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-600"></div>
        <span className="font-medium text-slate-700">Crítico: 91-100 pts</span>
      </div>
    </div>
  )
}
