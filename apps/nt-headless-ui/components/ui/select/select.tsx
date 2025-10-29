import { cn } from '@/lib/utils'
import clsx from 'clsx'
import type { ChangeEvent, ReactNode, Ref } from 'react'
import React, {
    cloneElement,
    forwardRef,
    isValidElement
} from 'react'

export type Options = { value: string; label: string }[]

export type SelectVariant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
    | 'bare'

export type SelectSize = 'small' | 'medium' | 'large'

export type SelectProps = {
    className?: string
    variant?: SelectVariant
    size?: SelectSize
    options?: Options
    groups?: {
        label: string
        options: Options
    }[]
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    iconLeft?: ReactNode
    classIconLeft?: string
    disabled?: boolean
}

const rootClassName = 'nt-select'

const variantStyles: Record<SelectVariant, string> = {
    default: `${rootClassName}-default`,
    danger: `${rootClassName}-danger`,
    success: `${rootClassName}-success`,
    warning: `${rootClassName}-warning`,
    bare: `${rootClassName}-bare`
}

const sizeStyles: Record<SelectSize, string> = {
    small: `${rootClassName}-small`,
    medium: `${rootClassName}-medium`,
    large: `${rootClassName}-large`
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            variant = 'default',
            size = 'medium',
            options = [],
            groups = [],
            placeholder = 'Select an option',
            value,
            onChange,
            iconLeft,
            classIconLeft = '',
            disabled = false
        },
        ref: Ref<HTMLSelectElement>
    ) => {
        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value)
        }

        const selectEl = (
            <select
                className={clsx(
                    rootClassName,
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                value={value ?? ''}
                onChange={handleChange}
                disabled={disabled}
                ref={ref}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {groups.length > 0
                    ? groups.map((group) => (
                          <optgroup
                              key={group.label}
                              label={group.label}
                          >
                              {group.options.map((opt) => (
                                  <option
                                      key={opt.value}
                                      value={opt.value}
                                  >
                                      {opt.label}
                                  </option>
                              ))}
                          </optgroup>
                      ))
                    : options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                              {opt.label}
                          </option>
                      ))}
            </select>
        )

        if (isValidElement(iconLeft)) {
            return (
                <div className="nt-select-wrapper ">
                    {isValidElement<{ className?: string }>(
                        iconLeft
                    ) &&
                        cloneElement(iconLeft, {
                            className: cn(
                                iconLeft.props.className,
                                classIconLeft,
                                {
                                    disabled
                                }
                            )
                        })}
                    {selectEl}
                </div>
            )
        }

        return selectEl
    }
)

Select.displayName = 'Select'

export default Select
