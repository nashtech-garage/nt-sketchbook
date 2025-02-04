import { cn } from '@headless-ui/lib/utils'
import * as React from 'react'

export type InputVariant =
    | 'default'
    | 'danger'
    | 'warning'
    | 'violet'
    | 'success'
export type InputSize = 'small' | 'medium' | 'large'

export type InputProps = React.ComponentProps<'input'> & {
    variant?: InputVariant
    inputSize?: InputSize
    leftIcon?: React.ReactNode | React.JSX.Element
    rightIcon?: React.ReactNode | React.JSX.Element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            variant = 'default',
            inputSize = 'medium',
            leftIcon,
            rightIcon,
            ...props
        },
        ref,
    ) => {
        const variantClasses: Record<InputVariant, string> = {
            default: 'border-secondary-6',
            danger: 'border-danger',
            warning: 'border-warning',
            violet: 'border-secondary-1',
            success: 'border-success',
        }

        const sizeClasses: Record<InputSize, string> = {
            small: 'h-8 text-xs',
            medium: 'h-10 text-sm',
            large: 'h-12 text-base',
        }

        return (
            <div className="relative flex items-center">
                {leftIcon && (
                    <span className="absolute left-3">
                        {leftIcon}
                    </span>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex w-full rounded px-3 py-1 transition-colors border',
                        'placeholder:text-shade-neutral-20 text-secondary-5',
                        'focus-visible:outline-none focus-visible:shadow hover:shadow',
                        'disabled:shadow-none disabled:cursor-not-allowed',
                        sizeClasses[inputSize],
                        variantClasses[variant],
                        leftIcon ? 'pl-10' : '',
                        rightIcon ? 'pr-10' : '',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {rightIcon && (
                    <span className="absolute right-3">
                        {rightIcon}
                    </span>
                )}
            </div>
        )
    },
)

Input.displayName = 'Input'

export { Input }
