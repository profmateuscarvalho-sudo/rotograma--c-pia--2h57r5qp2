import React, { useRef, useState } from 'react'
import { RiskType } from '@/types'
import { SignageIcon } from '@/components/ui/signage-icon'
import { cn } from '@/lib/utils'
import { getRiskWeightStyles } from '@/lib/risk-utils'

interface RiskButtonProps {
  risk: RiskType
  count: number
  onAdd: (risk: RiskType) => void
  onRemove: (risk: RiskType) => void
  onLongPressRisk: (risk: RiskType) => void
}

export function RiskButton({ risk, count, onAdd, onRemove, onLongPressRisk }: RiskButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCount = useRef(0)

  const handlePointerDown = () => {
    setIsPressed(true)
    timerRef.current = setTimeout(() => {
      onLongPressRisk(risk)
      clickCount.current = 0 // reset clicks if long press
    }, 500)
  }

  const handlePointerUp = () => {
    setIsPressed(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    clickCount.current += 1

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    clickTimeoutRef.current = setTimeout(() => {
      if (clickCount.current === 1) {
        onRemove(risk)
      } else if (clickCount.current >= 2) {
        onAdd(risk)
      }
      clickCount.current = 0
    }, 300)
  }

  return (
    <button
      className={cn(
        'relative flex flex-col items-center justify-center p-2 rounded-xl transition-all select-none touch-manipulation border-2',
        count > 0
          ? getRiskWeightStyles(risk.baseWeight, true)
          : 'bg-white border-transparent shadow-sm hover:bg-slate-50',
        isPressed && 'scale-95',
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative mb-2">
        <SignageIcon
          iconName={risk.iconName}
          customIconUrl={risk.customIconUrl}
          className={cn('w-12 h-12 transition-transform', count > 0 ? 'scale-110' : 'scale-100')}
        />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 animate-fade-in">
            {count}
          </span>
        )}
      </div>
      <span
        className={cn(
          'text-[10px] font-bold text-center leading-tight line-clamp-2 h-7 px-1',
          count > 0 ? 'text-white' : 'text-slate-700',
        )}
      >
        {risk.name}
      </span>
    </button>
  )
}
