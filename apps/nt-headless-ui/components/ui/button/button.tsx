import { cn } from '@/lib/utils'
import { type ComponentPropsWithRef, forwardRef } from 'react'

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'gradient'
    | 'neutral'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
    variant?: ButtonVariant
    size?: ButtonSize
    outline?: boolean
} & ComponentPropsWithRef<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            outline = false,
            className,
            children,
            ...rest
        },
        ref
    ) => {
        const baseClass = 'nt-button'
        const variantClass =
            outline && variant !== 'gradient'
                ? `nt-button-outline nt-button-${variant}`
                : `nt-button-${variant}`

        const sizeClass = size === 'md' ? '' : `nt-button-${size}`

        return (
            <button
                ref={ref}
                className={cn(
                    baseClass,
                    variantClass,
                    sizeClass,
                    className
                )}
                {...rest}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
