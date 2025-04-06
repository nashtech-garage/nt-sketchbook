import {
    TooltipContent,
    TooltipProvider,
    Tooltip as TooltipRadix,
    TooltipTrigger,
} from '@headless-ui/components/radix/tooltip'
import { cn } from '@headless-ui/lib/utils'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import React from 'react'

const variantArrowClasses: Record<TooltipVariant, string> = {
    default: 'fill-gray-800',
    danger: 'fill-danger',
    warning: 'fill-warning',
    success: 'fill-success',
    info: 'fill-info',
}
const variantClasses: Record<TooltipVariant, string> = {
    default: 'bg-gray-800 text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-black',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
}
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

export const Tooltip = (props: TooltipProps) => {
    const {
        children = 'Tooltip content',
        trigger = 'Hover',
        className = '',
        position = 'top',
        variant = 'default',
        classNameArrow = '',
    } = props

    return (
        <TooltipProvider>
            <TooltipRadix>
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent
                    className={cn(variantClasses[variant], className)}
                    side={position}
                >
                    {children}
                    <TooltipPrimitive.Arrow
                        className={cn(
                            variantArrowClasses[variant],
                            classNameArrow,
                        )}
                    />
                </TooltipContent>
            </TooltipRadix>
        </TooltipProvider>
    )
}
