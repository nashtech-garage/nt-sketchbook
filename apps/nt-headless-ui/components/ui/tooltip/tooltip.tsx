import {
    TooltipProvider,
    Tooltip as TooltipRadix,
    TooltipTrigger
} from '@/components/radix/tooltip'
import { cn } from '@/lib/utils'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import React from 'react'

export type TooltipVariant =
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export type TooltipProps = {
    children: React.ReactNode
    trigger?: React.ReactNode
    variant?: TooltipVariant
    className?: string
    classNameArrow?: string
    position?: TooltipPosition
}

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(className)}
            {...props}
        />
    </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export const Tooltip = ({
    children = 'Tooltip content',
    trigger = 'Hover',
    className = '',
    position = 'top',
    variant = 'default',
    classNameArrow = ''
}: TooltipProps) => {
    return (
        <TooltipProvider>
            <TooltipRadix>
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent
                    className={cn(
                        `nt-tooltip nt-tooltip-${variant} show`,
                        className
                    )}
                    side={position}
                >
                    {children}
                    <TooltipPrimitive.Arrow
                        className={cn('arrow-svg', classNameArrow)}
                    />
                </TooltipContent>
            </TooltipRadix>
        </TooltipProvider>
    )
}

export default Tooltip
