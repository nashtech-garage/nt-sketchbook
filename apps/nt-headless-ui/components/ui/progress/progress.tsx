import { cn } from '@/lib/utils'
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
    size?: 'sm' | 'md' | 'lg' | 'xl'
    displayPercent?: boolean
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
            size = 'md',
            displayPercent = false,
            ...props
        },
        ref
    ) => (
        <div
            className={cn(
                `nt-progress`,
                { [`nt-progress-${variant}`]: variant !== 'default' },
                { [`nt-progress-${size}`]: size !== 'sm' },
                className
            )}
            ref={ref}
            {...props}
        >
            <div
                className="nt-progress-bar"
                style={{ width: `${value}%` }}
            ></div>
            {displayPercent && (
                <span
                    className={cn('nt-progress-label', {
                        'nt-progress-label-outside':
                            Number(value) >= 100
                    })}
                >
                    {value}%
                </span>
            )}
        </div>
    )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
