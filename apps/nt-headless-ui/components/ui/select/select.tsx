import clsx from 'clsx'
import type { ReactNode } from 'react'
import React from 'react'

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

const Select = ({
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
}: SelectProps) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
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
        >
            {placeholder && (
                <option value="" disabled hidden>
                    {placeholder}
                </option>
            )}

            {groups.length > 0
                ? groups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
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

    if (iconLeft) {
        return (
            <div className="nt-select-wrapper ">
                {React.cloneElement(iconLeft as React.ReactElement, {
                    className: clsx('nt-select-icon', classIconLeft)
                })}
                {selectEl}
            </div>
        )
    }

    return selectEl
}

export { Select }
