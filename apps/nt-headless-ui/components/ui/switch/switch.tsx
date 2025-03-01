import { cn } from '@headless-ui/lib/utils'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

export type SwitchProps = React.ComponentPropsWithoutRef<
    typeof SwitchPrimitives.Root
> & {
    variant?: 'default' | 'primary' | 'silver' | 'danger'
    size?: 'small' | 'medium'
}
const variantClasses = {
    default:
        'data-[state=checked]:bg-success data-[state=unchecked]:bg-neutral-200',
    primary:
        'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-200',
    black: 'data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-gray-200',
    danger: 'data-[state=checked]:bg-danger data-[state=unchecked]:bg-gray-200',
}

const sizeClasses = {
    small: 'h-5 w-9 data-[state=checked]:translate-x-3',
    medium: 'h-8 w-12 data-[state=checked]:translate-x-4',
}

const thumbSizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-7 w-7',
}

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(
    (
        { className, variant = 'default', size = 'small', ...props },
        ref,
    ) => {
        return (
            <SwitchPrimitives.Root
                className={cn(
                    'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
                    'shadow-sm transition-colors focus-visible:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
                    'focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
                    'dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950',
                    variantClasses[variant],
                    sizeClasses[size],
                    className,
                )}
                {...props}
                ref={ref}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform',
                        'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-neutral-950',
                        thumbSizeClasses[size],
                    )}
                />
            </SwitchPrimitives.Root>
        )
    },
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
