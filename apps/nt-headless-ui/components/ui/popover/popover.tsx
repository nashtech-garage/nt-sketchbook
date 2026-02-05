import {
    Popover as PopoverComponent,
    PopoverPrimitive,
    PopoverTrigger
} from '@/components/radix/popover'
import { cn } from '@/lib/utils'
import * as React from 'react'

export type PopoverVariant =
    | 'default'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'

export type Side = 'top' | 'right' | 'bottom' | 'left'

export type PopoverProps = {
    children: React.ReactNode
    trigger: React.ReactNode
    className?: string
    side?: Side
    variant?: PopoverVariant
}

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
    (
        { className, align = 'center', sideOffset = 4, ...props },
        ref
    ) => (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(className)}
                avoidCollisions={false}
                {...props}
            />
        </PopoverPrimitive.Portal>
    )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export const Popover = (props: PopoverProps) => {
    const {
        trigger,
        children,
        className = '',
        side = 'right',
        variant = 'default'
    } = props

    return (
        <PopoverComponent>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                className={cn(
                    `nt-popover show nt-popover-${variant}`,
                    className
                )}
                side={side}>
                {children}
                <PopoverPrimitive.Arrow
                    role="presentation"
                    className={cn('arrow-svg')}
                />
            </PopoverContent>
        </PopoverComponent>
    )
}

export default Popover
