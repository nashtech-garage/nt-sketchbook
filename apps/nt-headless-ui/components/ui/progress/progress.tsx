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
    displayPercent?: boolean
}

const variantClasses = {
    default: 'bg-shade-secondary-1-10',
    danger: 'bg-danger-thin',
    warning: 'bg-warning-thin',
    success: 'bg-success-thin',
    info: 'bg-info-thin',
}

const variantIndicatorClasses = {
    default: 'bg-purple',
    danger: 'bg-danger',
    warning: 'bg-warning',
    success: 'bg-success',
    info: 'bg-info',
}

const sizeClasses = {
    small: 'h-3',
    medium: 'h-4',
    large: 'h-5',
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
            displayPercent = false,
            ...props
        },
        ref,
    ) => {
        const remainingPercent = React.useMemo(
            () => 100 - (value || 0),
            [value],
        )
        return (
            <div className="flex items-center justify-between">
                <ProgressPrimitive.Root
                    ref={ref}
                    className={cn(
                        'relative overflow-hidden rounded-full w-full',
                        {
                            'flex items-center justify-between':
                                displayPercent,
                            'w-[95%]':
                                displayPercent && Number(value) > 95,
                        },
                        sizeClasses[size],
                        variantClasses[variant],
                        className,
                    )}
                    {...props}
                >
                    <ProgressPrimitive.Indicator
                        className={cn(
                            `flex-1 transition-all h-full progress-indicator `,
                            variantIndicatorClasses[variant],
                        )}
                        style={{ width: `${value}%` }}
                    />
                    {displayPercent && value !== 100 && (
                        <span
                            style={{ width: remainingPercent + '%' }}
                            className="pl-2 text-sm font-bold"
                        >
                            {Number(value) <= 95 && value + '%'}
                        </span>
                    )}
                </ProgressPrimitive.Root>
                {displayPercent && Number(value) > 95 && (
                    <span className="pl-2 text-sm font-bold">
                        {value}%
                    </span>
                )}
            </div>
        )
    },
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
