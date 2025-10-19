import { cn } from '@/lib/utils'
import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
    useMemo
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
    label?: string
    layout?: 'static' | 'float'
    hasError?: boolean
    message?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const {
            className = '',
            wrapperClassName = '',
            variant = 'default',
            leftIcon,
            rightIcon,
            hasIcon = false,
            label,
            layout = 'static',
            hasError = false,
            message = '',
            ...restProps
        } = props

        const inputClassNameWrapper = useMemo(() => {
            if (hasError) {
                return 'nt-input-error'
            }
            return (
                variant !== 'default' &&
                !rightIcon &&
                `nt-input-container-${variant}`
            )
        }, [variant, hasError])

        const inputClassName = useMemo(() => {
            if (hasError) {
                return 'nt-input-danger'
            }
            return (
                variant !== 'default' &&
                !rightIcon &&
                `nt-input-${variant}`
            )
        }, [variant, hasError])

        const inputMessageClassName = useMemo(() => {
            if (hasError) {
                return 'nt-input-error'
            }
            return 'nt-input-highlight'
        }, [hasError, message])

        const inputElement = (
            <input
                ref={ref}
                className={cn('nt-input', inputClassName, className)}
                {...restProps}
            />
        )

        return (
            <div className={`nt-input-group nt-input-${layout}`}>
                {label && (
                    <label className="nt-input-label">{label}</label>
                )}
                {hasIcon || rightIcon || leftIcon ? (
                    <div
                        className={cn(
                            'nt-input-container',
                            inputClassNameWrapper,
                            wrapperClassName
                        )}
                    >
                        {leftIcon && (
                            <span className="nt-input-icon">
                                {leftIcon}
                            </span>
                        )}

                        {inputElement}

                        {rightIcon && (
                            <span className="nt-input-icon">
                                {rightIcon}
                            </span>
                        )}
                    </div>
                ) : (
                    inputElement
                )}

                {(message || hasError) && (
                    <span className={inputMessageClassName}>
                        {message}
                    </span>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
