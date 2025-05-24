import {
    Popover as PopoverComponent,
    PopoverContent,
    PopoverPrimitive,
    PopoverTrigger,
} from '@/components/radix/popover'
import { cn } from '@/lib/utils'
import * as React from 'react'

export type PopoverVariant =
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'

const variantArrowClasses: Record<PopoverVariant, string> = {
    default: 'fill-gray-800',
    danger: 'fill-danger',
    warning: 'fill-warning',
    success: 'fill-success',
    info: 'fill-info',
}
const variantClasses: Record<PopoverVariant, string> = {
    default: 'bg-gray-800 text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-black',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
}

export type Side = 'top' | 'right' | 'bottom' | 'left'
export type Align = 'start' | 'center' | 'end'

export type PopoverProps = {
    classNameArrow?: string
    trigger: React.ReactNode
    side?: Side
    className?: string
    children: React.ReactNode
    variant?: PopoverVariant
    align?: Align
}

export const Popover = (props: PopoverProps) => {
    const {
        trigger,
        children,
        align = 'center',
        className = '',
        side = 'right',
        variant = 'default',
        classNameArrow = '',
    } = props

    return (
        <PopoverComponent>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                align={align}
                className={cn(variantClasses[variant], className)}
                side={side}
            >
                {children}
                <PopoverPrimitive.Arrow
                    role="presentation"
                    className={cn(
                        variantArrowClasses[variant],
                        classNameArrow,
                    )}
                />
            </PopoverContent>
        </PopoverComponent>
    )
}
