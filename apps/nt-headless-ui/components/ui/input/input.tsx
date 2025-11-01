import { cn } from '@/lib/utils'
import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
    useMemo
} from 'react'

import { BaseInput } from './base-input/base-input'
import { InputMessage } from './input-message/input-message'

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
            return `nt-input-${variant}`
        }, [variant, hasError])

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

                        <BaseInput
                            ref={ref}
                            className={cn(inputClassName, className)}
                            {...restProps}
                        />

                        {rightIcon && (
                            <span className="nt-input-icon">
                                {rightIcon}
                            </span>
                        )}
                    </div>
                ) : (
                    <BaseInput
                        ref={ref}
                        className={cn(inputClassName, className)}
                        {...restProps}
                    />
                )}

                <InputMessage message={message} hasError={hasError} />
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
