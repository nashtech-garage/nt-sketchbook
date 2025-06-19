import { cn } from '@/lib/utils'
import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode
} from 'react'

export type InputVariant =
    | 'default'
    | 'danger'
    | 'warning'
    | 'success'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: InputVariant
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    className?: string
    wrapperClassName?: string
    hasIcon?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const {
            className = '',
            wrapperClassName = '',
            variant = 'default',
            leftIcon,
            rightIcon,
            hasIcon = false,
            ...restProps
        } = props

        const inputElement = (
            <input
                ref={ref}
                className={cn(
                    'nt-input',
                    `nt-input-${variant}`,
                    className
                )}
                {...restProps}
            />
        )

        if (!hasIcon && !leftIcon && !rightIcon) return inputElement

        return (
            <div
                className={cn(
                    'nt-input-container',
                    variant !== 'default' &&
                        !rightIcon &&
                        `nt-input-container-${variant}`,
                    wrapperClassName
                )}
            >
                {leftIcon && (
                    <span className="nt-input-icon">{leftIcon}</span>
                )}

                {inputElement}

                {rightIcon && (
                    <span className="nt-input-icon">{rightIcon}</span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }
