import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

type ComboboxOption = {
    label: string
    value: string
}
export type ComboboxProps = {
    options: ComboboxOption[]
    className?: string
    classOption?: string
    noFoundText?: string
    onChange?: (option: ComboboxOption) => void
    placeholder?: string
    searchText?: string
}

export const Combobox = (props: ComboboxProps) => {
    const {
        options,
        className = '',
        classOption = '',
        placeholder = 'Choose an option',
        searchText = 'Search',
        noFoundText = 'No option found.',
        onChange = null
    } = props
    const [selectedOption, setSelectedOption] =
        useState<ComboboxOption>({
            value: '',
            label: ''
        })
    const [filteredOption, setFilteredOptions] =
        useState<ComboboxOption[]>(options)
    const [open, setOpen] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const toggleDropdown = () => {
        if (open) {
            setOpen(!open)
        } else {
            setOpen(!open)
            inputRef?.current?.focus()
        }
    }

    const selectOption = (option: ComboboxOption) => {
        if (option.value !== selectedOption.value) {
            setSelectedOption(option)
            filterFunction()
            setOpen(false)
            if (onChange) {
                onChange(option)
            }
        }
    }

    const filterFunction = () => {
        const filter = inputRef?.current?.value.toLowerCase() ?? ''
        const newFilteredOptions = options.filter(
            (option) =>
                option.value.toLowerCase().indexOf(filter) > -1
        )
        setFilteredOptions(newFilteredOptions)
    }
    return (
        <div className={cn('nt-combobox', className)}>
            <button
                className={cn(
                    'nt-combobox-trigger',
                    open ? 'active' : undefined
                )}
                onClick={toggleDropdown}>
                {selectedOption.label || placeholder}
            </button>
            <div
                className={cn(
                    'nt-combobox-popover',
                    classOption,
                    open ? 'show' : undefined
                )}>
                <input
                    ref={inputRef}
                    className="nt-combobox-input"
                    type="text"
                    placeholder={searchText}
                    onKeyUp={filterFunction}
                />
                <div className="nt-combobox-list">
                    {filteredOption.length === 0 && (
                        <div className="no-results">
                            {noFoundText}
                        </div>
                    )}
                    {filteredOption.map((option) => (
                        <button
                            key={option.value}
                            className={cn(
                                'nt-combobox-list-item',
                                option.value === selectedOption.value
                                    ? 'selected-item'
                                    : ''
                            )}
                            onClick={() => selectOption(option)}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Combobox
