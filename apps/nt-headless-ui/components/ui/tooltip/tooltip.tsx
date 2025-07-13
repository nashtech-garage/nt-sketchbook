import { cn } from '@/lib/utils'
import React from 'react'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export type TooltipProps = {
    children: React.ReactNode
    trigger?: React.ReactNode
    className?: string
    position?: TooltipPosition
}

export const Tooltip = (props: TooltipProps) => {
    const {
        children = 'Tooltip content',
        trigger = 'Hover',
        className = '',
        position = 'top'
    } = props

    return (
        <div>
            <div
                className={cn('nt-tooltip', `nt-tooltip-${position}`)}
            >
                <div className="nt-tooltip-trigger">{trigger}</div>
                <span className={cn('nt-tooltip-content', className)}>
                    {children}
                </span>
            </div>
        </div>
    )
}
