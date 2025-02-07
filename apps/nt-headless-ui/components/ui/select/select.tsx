import { cn } from '@headless-ui/lib/utils'
import clsx from 'clsx'
import React, { ReactNode } from 'react'

import {
    RadixSelect,
    RadixSelectContent,
    RadixSelectGroup,
    RadixSelectItem,
    RadixSelectLabel,
    RadixSelectTrigger,
    RadixSelectValue,
} from './radix-select'

export type Options = { value: string; label: string }[]

export type SelectProps = {
    className?: string
    variant?: 'default' | 'danger' | 'success' | 'warning'
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
        'border-secondary-6 hover:border-shade-secondary-1-50 ' +
        'focus:border-shade-secondary-1-50 ',
    danger: 'border-danger hover:border-danger-bold focus:border-danger',
    success:
        'border-success hover:border-success-bold focus:border-success',
    warning:
        'border-warning hover:border-warning-bold focus:border-warning',
}

const variantIcon = {
    default:
        'group-hover:text-shade-secondary-1-50 group-focus:text-shade-secondary-1-50 ',
    danger: 'group-hover:text-danger group-focus:text-danger',
    success: 'group-hover:text-success group-focus:text-success',
    warning: 'group-hover:text-warning group-focus:text-warning',
}

const Select = (props: SelectProps) => {
    const {
        className,
        variant = 'default',
        options = [],
        classOption = '',
        placeholder = '',
        groups = [],
        value,
        onChange,
        iconLeft = null,
        classIconLeft = '',
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
                    className,
                )}
            >
                {iconLeft ? (
                    <div className="flex items-center gap-2 w-full">
                        <span className="flex items-center justify-center">
                            {React.cloneElement(
                                iconLeft as React.ReactElement,
                                {
                                    className: cn(
                                        'w-[14px] h-[14px] icon-left text-inherit',
                                        variantIcon[variant],
                                        classIconLeft,
                                    ),
                                },
                            )}
                        </span>
                        <RadixSelectValue
                            placeholder={placeholder}
                            className="flex-1 text-left"
                        />
                    </div>
                ) : (
                    <RadixSelectValue
                        placeholder={placeholder}
                        className="text-left w-full"
                    />
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
