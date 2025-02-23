import { cn } from '@headless-ui/lib/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '../../radix/command'
import { SelectedBadge } from './components/selected-badge'
import { useMultiSelect } from './hooks/use-multi-select'

export type Option = Record<'value' | 'label', string>

export type MultipleSelectVariant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
export type MultipleSelectSize = 'small' | 'medium' | 'large'

export const variantStyles = {
    default:
        'border-secondary-6 hover:border-shade-secondary-1-50 focus-within:border-shade-secondary-1-50',
    danger: 'border-danger hover:border-danger focus-within:border-danger',
    success:
        'border-success hover:border-success focus-within:border-success',
    warning:
        'border-warning hover:border-warning focus-within:border-warning',
}

export const variantIcon = {
    default:
        'group-hover:text-shade-secondary-1-50 group-focus:text-shade-secondary-1-50',
    danger: 'group-hover:text-danger group-focus:text-danger',
    success: 'group-hover:text-success group-focus:text-success',
    warning: 'group-hover:text-warning group-focus:text-warning',
}

export type MultipleSelectProps = {
    options: Option[]
    iconLeft?: React.ReactNode
    classIconLeft?: string
    variant?: MultipleSelectVariant
    initialOption?: Option[]
    placeholder?: string
    onChange?: (selected: Option[]) => void
    disabled?: boolean
}

export const MultipleSelect = (props: MultipleSelectProps) => {
    const {
        placeholder = '',
        variant = 'default',
        iconLeft = null,
        classIconLeft = '',
        disabled = false,
        ...useMultiSelectProps
    } = props

    const {
        selected,
        selectTables,
        handleUnselect,
        handleKeyDown,
        inputValue,
        setInputValue,
        open,
        inputRef,
        setSelected,
        setOpen,
    } = useMultiSelect(useMultiSelectProps)

    return (
        <Command
            onKeyDown={handleKeyDown}
            className={cn('overflow-visible bg-transparent')}
        >
            <div
                data-testid="multi-select"
                className={cn(
                    'group rounded-[4px] border px-3 py-2 text-sm ring-offset-background',
                    variantStyles[variant],
                    {
                        'bg-shade-neutral-9 hover:border-shade-neutral-40 border-shade-neutral-40':
                            disabled,
                    },
                )}
            >
                <div
                    className="flex items-center flex-wrap gap-1"
                    onBlur={() => !disabled && setOpen(false)}
                    onFocus={() => !disabled && setOpen(true)}
                >
                    {iconLeft &&
                        React.cloneElement(
                            iconLeft as React.ReactElement,
                            {
                                className: cn(
                                    'w-[16px] h-[16px] icon-left mr-2 text-shade-neutral-70 ',
                                    variantIcon[variant],
                                    classIconLeft,
                                    {
                                        'group-hover:text-shade-neutral-40 text-shade-neutral-40':
                                            disabled,
                                    },
                                ),
                            },
                        )}
                    {selected.map((option) => (
                        <SelectedBadge
                            handleUnselect={handleUnselect}
                            option={option}
                            key={option.value}
                            disable={disabled}
                        />
                    ))}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        placeholder={
                            selected.length === 0 ? placeholder : ''
                        }
                        data-testid="multi-select-input"
                        className={cn(
                            'flex-1 bg-transparent outline-none placeholder:text-shade-neutral-20',
                            'disabled:cursor-not-allowed',
                        )}
                        disabled={disabled}
                    />
                    <ChevronDown className="w-4 h-4 text-muted-foreground cursor-pointer mr-2" />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectTables.length > 0 && (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectTables.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onSelect={() => {
                                            if (!disabled) {
                                                setInputValue('')
                                                setSelected(
                                                    (prev) => [
                                                        ...prev,
                                                        option,
                                                    ],
                                                )
                                            }
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </div>
                    )}
                </CommandList>
            </div>
        </Command>
    )
}
