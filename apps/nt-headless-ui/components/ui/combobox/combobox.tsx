import { Button } from '@headless-ui/components/radix/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@headless-ui/components/radix/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@headless-ui/components/radix/popover'
import { cn } from '@headless-ui/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

export type VariantCombobox =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'

const variantStyles = {
    default:
        'border-secondary-6 hover:border-shade-secondary-1-50 ' +
        'focus:border-shade-secondary-1-50 ',
    danger: 'border-danger hover:border-danger focus:border-danger ',
    success:
        'border-success hover:border-success focus:border-success',
    warning:
        'border-warning hover:border-warning focus:border-warning',
}

const variantOption = {
    default: 'hover:bg-shade-secondary-1-10  hover:text-text',
    danger: 'hover:bg-danger  hover:text-white',
    success: 'hover:bg-success hover:text-white',
    warning: 'hover:bg-warning  hover:text-white',
}

const variantOptionSelected = {
    default: 'bg-shade-secondary-1-10 text-text',
    danger: 'bg-danger text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
}

export type ComboboxProps = {
    options: {
        icon?: React.ReactNode
        value: string
        label: string
    }[]
    className?: string
    classOption?: string
    placeholder?: string
    searchText?: string
    variant?: VariantCombobox
    noFoundText?: string
    onChange?: (value: string) => void
}

export const Combobox = (props: ComboboxProps) => {
    const {
        options,
        variant = 'default',
        className = '',
        classOption = '',
        placeholder = 'Choose an option',
        searchText = 'Search',
        noFoundText = 'No option found.',
        onChange = null,
    } = props

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')

    const handleOnChange = (currentValue: string) => {
        setValue(currentValue === value ? '' : currentValue)
        setOpen(false)
        if (onChange) {
            onChange(currentValue)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'justify-between w-full',
                        'text-sm text-text font-regular hover:bg-white',
                        variantStyles[variant],
                        className,
                    )}
                >
                    {value
                        ? options.find(
                              (option) => option.value === value,
                          )?.label
                        : placeholder}
                    <ChevronDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    'p-0 w-[--radix-popover-trigger-width]',
                    classOption,
                )}
            >
                <Command>
                    <CommandInput
                        placeholder={searchText}
                        className="h-9 border-0"
                    />
                    <CommandList>
                        <CommandEmpty>{noFoundText}</CommandEmpty>
                        <CommandGroup role="dialog">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) =>
                                        handleOnChange(currentValue)
                                    }
                                    className={cn(
                                        variantOption[variant],
                                        value === option.value &&
                                            variantOptionSelected[
                                                variant
                                            ],
                                    )}
                                >
                                    {option.icon &&
                                        React.cloneElement(
                                            option.icon as React.ReactElement,
                                        )}
                                    {option.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === option.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
