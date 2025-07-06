import { cn } from '@/lib/utils'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import React from 'react'

import {
    RadixSelect,
    RadixSelectContent,
    RadixSelectGroup,
    RadixSelectItem,
    RadixSelectLabel,
    RadixSelectTrigger,
    RadixSelectValue
} from '../../radix/select'

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
} & React.ComponentPropsWithoutRef<typeof RadixSelect>

const variantStyles = {
    default:
        'border-secondary-6 hover:border-shade-secondary-1-50 focus:border-secondary-1 focus:shadow-shade-secondary-1/15',
    danger: 'border-danger hover:border-danger-bold focus:border-danger focus:shadow-danger-bold/15',
    success:
        'border-success-bold hover:border-success-bold focus:border-success-bold focus:shadow-success-bold/15',
    warning:
        'border-warning hover:border-warning focus:border-warning focus:shadow-warning-bold/15',
    bare: 'border-none hover:bg-shade-secondary-1-10 hover:text-shade-secondary-1-50 focus:border-solid focus:border-secondary-1 focus:shadow-none'
}

const sizeLeftIconStyles = {
    small: 'w-[14px] h-[14px] mr-3',
    medium: 'w-[14px] h-[14px] mr-3',
    large: 'w-[16px] h-[16px] mr-5'
}

const variantIcon = {
    default:
        'text-shade-neutral-70 group-hover:text-shade-secondary-1 group-focus:text-shade-neutral-1',
    danger: 'text-danger-bold',
    success: 'text-success-bold',
    warning: 'text-warning-bold',
    bare: 'text-shade-neutral-70 group-hover:text-shade-secondary-1 group-focus:text-shade-neutral-1'
}

const sizeStyles = {
    small: 'h-8 text-xs px-3',
    medium: 'h-10 text-sm px-4',
    large: 'h-12 text-md px-5'
}

const Select = (props: SelectProps) => {
    const {
        className,
        variant = 'default',
        size = 'small',
        options = [],
        classOption = '',
        placeholder = 'Select',
        groups = [],
        value,
        onChange,
        iconLeft = null,
        classIconLeft = ''
    } = props
    return (
        <RadixSelect
            value={value}
            onValueChange={onChange}
            {...props}
        >
            <RadixSelectTrigger
                className={clsx(
                    'group',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
            >
                {iconLeft ? (
                    <div className="flex items-center w-full">
                        <span className="flex items-center justify-center">
                            {React.cloneElement(
                                iconLeft as React.ReactElement,
                                {
                                    className: cn(
                                        'icon-left',
                                        sizeLeftIconStyles[size],
                                        variantIcon[variant],
                                        classIconLeft
                                    )
                                }
                            )}
                        </span>
                        <RadixSelectValue placeholder={placeholder} />
                    </div>
                ) : (
                    <RadixSelectValue placeholder={placeholder} />
                )}
            </RadixSelectTrigger>
            <RadixSelectContent>
                {groups.length > 0
                    ? groups.map((group) => (
                          <RadixSelectGroup key={group.label}>
                              {group.label && (
                                  <RadixSelectLabel>
                                      {group.label}
                                  </RadixSelectLabel>
                              )}
                              {group.options.map((option) => (
                                  <RadixSelectItem
                                      key={option.value}
                                      value={option.value}
                                      className={classOption}
                                  >
                                      {option.label}
                                  </RadixSelectItem>
                              ))}
                          </RadixSelectGroup>
                      ))
                    : options.map((option) => (
                          <RadixSelectItem
                              className={classOption}
                              key={option.value}
                              value={option.value}
                          >
                              {option.label}
                          </RadixSelectItem>
                      ))}
            </RadixSelectContent>
        </RadixSelect>
    )
}

export { Select }
