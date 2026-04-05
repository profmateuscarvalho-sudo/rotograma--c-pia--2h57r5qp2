import React from 'react'
import { cn } from '@/lib/utils'
import { IconRenderer } from '@/components/icons'

interface SignageIconProps {
  iconName?: string
  customIconUrl?: string
  className?: string
  iconClassName?: string
}

export function SignageIcon({
  iconName,
  customIconUrl,
  className,
  iconClassName,
}: SignageIconProps) {
  return (
    <div className={cn('relative flex items-center justify-center shrink-0', className)}>
      <div className="absolute inset-0 bg-[#ffcc00] border-[3px] border-black rotate-45 rounded-[4px] shadow-sm" />
      <div className="relative z-10 flex items-center justify-center w-full h-full text-black">
        {customIconUrl ? (
          <img
            src={customIconUrl}
            alt="Custom Risk Icon"
            className={cn('w-3/5 h-3/5 object-contain drop-shadow-sm', iconClassName)}
          />
        ) : (
          <IconRenderer
            name={iconName || 'TriangleAlert'}
            className={cn('w-3/5 h-3/5', iconClassName)}
            strokeWidth={2.5}
          />
        )}
      </div>
    </div>
  )
}
