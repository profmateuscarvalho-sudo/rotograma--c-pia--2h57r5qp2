import React from 'react'
import { RiskType } from '@/types'
import { SignageIcon } from '@/components/ui/signage-icon'

interface RiskButtonProps {
  risk: RiskType
  count: number
  onAdd: (risk: RiskType) => void
  onRemove: (risk: RiskType) => void
  onLongPressRisk: (risk: RiskType) => void
}

export function RiskButton({ risk, count, onAdd, onRemove, onLongPressRisk }: RiskButtonProps) {
  let pressTimer: NodeJS.Timeout

  const handleTouchStart = () => {
    pressTimer = setTimeout(() => {
      onLongPressRisk(risk)
    }, 500)
  }

  const handleTouchEnd = () => {
    if (pressTimer) clearTimeout(pressTimer)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onAdd(risk)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onRemove(risk)
  }

  return (
    <button
      className="relative flex flex-col items-center justify-start p-2 bg-white rounded-xl shadow-sm border border-slate-200 active:scale-95 transition-transform select-none h-full"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {count > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm z-20 animate-in zoom-in">
          {count}
        </div>
      )}
      <div className="h-14 flex items-center justify-center mb-2 mt-1">
        <SignageIcon
          iconName={risk.iconName}
          customIconUrl={risk.customIconUrl}
          className="w-10 h-10"
        />
      </div>
      <span className="text-[10px] font-bold text-slate-700 text-center leading-tight line-clamp-2 mt-auto">
        {risk.name}
      </span>
    </button>
  )
}
