import { cn } from '@/lib/utils'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import React, { useState } from 'react'

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
    options: Options
    groups?: {
        label: string
        options: Options
    }[]
    classOption?: string
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    iconLeft?: ReactNode
    classIconLeft?: string
    disabled?: boolean
}

const rootClassName = 'nt-select'

const variantStyles = {
    default: `${rootClassName}-default`,
    danger: `${rootClassName}-danger`,
    success: `${rootClassName}-success`,
    warning: `${rootClassName}-warning`,
    bare: `${rootClassName}-bare`
}

const variantIcon = {
    default: '',
    danger: '',
    success: '',
    warning: '',
    bare: ''
}

const sizeStyles = {
    small: `${rootClassName}-small`,
    medium: `${rootClassName}-medium`,
    large: `${rootClassName}-large`
}

type SelectOptionProps = {
    option: Options[0]
    className?: string
    onChange?: (value: string) => void
}

const SelectOption = ({
    option,
    className,
    onChange
}: SelectOptionProps) => {
    return (
        <li
            key={option.value}
            className={clsx(
                `${rootClassName}-options-item`,
                className
            )}
            role="option"
            tabIndex={-1}
            aria-selected="false"
            onClick={() => {
                if (onChange) {
                    onChange(option.value)
                }
            }}
        >
            {option.label}
        </li>
    )
}

const Select = (props: SelectProps) => {
    const {
        className,
        variant = 'default',
        size = 'small',
        options = [],
        groups = [],
        classOption = '',
        placeholder = 'Select',
        value,
        onChange,
        iconLeft = null,
        classIconLeft = ''
    } = props
    const [expanded, setExpanded] = useState(false)

    const renderGroups = () => {
        return (
            <>
                {groups.map((group) => (
                    <>
                        <li
                            key={group.label}
                            className={`${rootClassName}-group`}
                        >
                            <div
                                className={`${rootClassName}-group-label`}
                            >
                                {group.label}
                            </div>
                        </li>
                        {group.options.map((option) => (
                            <SelectOption
                                key={option.value}
                                option={option}
                                className={classOption}
                                onChange={onChange}
                            />
                        ))}
                    </>
                ))}
            </>
        )
    }

    const shouldRenderGroup = groups && groups.length > 0

    const getLabel = () => {
        if (!value) return placeholder
        if (shouldRenderGroup) {
            for (const group of groups) {
                for (const option of group.options) {
                    if (option.value === value) {
                        return option.label
                    }
                }
            }
        }
        return options.find((option) => option.value === value)?.label
    }

    return (
        <button
            className={clsx(
                rootClassName,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            role="listbox"
            tabIndex={0}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
        >
            {iconLeft &&
                React.cloneElement(iconLeft as React.ReactElement, {
                    className: cn(
                        'icon-left',
                        variantIcon[variant],
                        classIconLeft
                    )
                })}
            <div
                className={clsx(
                    `${rootClassName}-placeholder`,
                    `${sizeStyles[size]}-placeholder`
                )}
                aria-live="polite"
            >
                {getLabel()}
            </div>
            <ul
                className={`${rootClassName}-options`}
                role="listbox"
                aria-labelledby="selected"
            >
                {shouldRenderGroup
                    ? renderGroups()
                    : options.map((option) => (
                          <SelectOption
                              key={option.value}
                              option={option}
                              className={classOption}
                              onChange={onChange}
                          />
                      ))}
            </ul>
        </button>
    )
}

export { Select }
