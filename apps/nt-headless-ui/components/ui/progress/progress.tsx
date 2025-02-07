import { cn } from '@headless-ui/lib/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

export type ProgressVariant =
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'

export type ProgressProps = React.ComponentPropsWithoutRef<
    typeof ProgressPrimitive.Root
> & {
    variant?: ProgressVariant
    size?: 'small' | 'medium' | 'large'
}

const variantClasses = {
    default: 'bg-secondary-6',
    danger: 'bg-danger-thin',
    warning: 'bg-warning-thin',
    success: 'bg-success-thin',
    info: 'bg-info-thin',
}

const variantIndicatorClasses = {
    default: 'bg-black',
    danger: 'bg-danger',
    warning: 'bg-warning',
    success: 'bg-success',
    info: 'bg-info',
}

const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(
    (
        {
            className,
            value,
            variant = 'default',
            size = 'medium',
            ...props
        },
        ref,
    ) => {
        return (
            <ProgressPrimitive.Root
                ref={ref}
                className={cn(
                    'relative w-full overflow-hidden rounded-full',
                    sizeClasses[size],
                    variantClasses[variant],
                    className,
                )}
                {...props}
            >
                <ProgressPrimitive.Indicator
                    className={cn(
                        'w-full flex-1 transition-all h-full progress-indicator',
                        variantIndicatorClasses[variant],
                    )}
                    style={{
                        transform: `translateX(-${
                            100 - (value || 0)
                        }%)`,
                    }}
                />
            </ProgressPrimitive.Root>
        )
    },
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
