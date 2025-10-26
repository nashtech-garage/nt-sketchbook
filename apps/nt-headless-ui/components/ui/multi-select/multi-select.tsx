import { cn } from '@/lib/utils'
import { cloneElement, isValidElement, type ReactNode } from 'react'

import { useMultiSelect } from './hooks/use-multi-select'

export type Option = Record<'value' | 'label', string>

export type MultipleSelectVariant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
export type MultipleSelectSize = 'small' | 'medium' | 'large'

export type MultipleSelectProps = {
    options: Option[]
    iconLeft?: ReactNode
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
        setOpen
    } = useMultiSelect(useMultiSelectProps)

    return (
        <div
            className={cn(
                'nt-multi-select',
                `${
                    variant !== 'default' &&
                    `nt-multi-select-${variant}`
                }`
            )}
            tabIndex={0}
            onFocus={() => !disabled && setOpen(true)}
            onBlur={() => !disabled && setOpen(false)}
            onKeyDown={handleKeyDown}
        >
            <div className="nt-multi-select-control">
                {isValidElement<{ className?: string }>(iconLeft) &&
                    cloneElement(iconLeft, {
                        className: cn(
                            iconLeft.props.className,
                            classIconLeft,
                            {
                                disabled
                            }
                        )
                    })}

                <div className="nt-multi-select-tags">
                    {selected.map((option) => (
                        <span
                            className="nt-multi-select-tag"
                            key={option.value}
                        >
                            {option.label}
                            {!disabled && (
                                <button
                                    className="nt-multi-select-tag-remove"
                                    type="button"
                                    onClick={() =>
                                        handleUnselect(option)
                                    }
                                >
                                    &times;
                                </button>
                            )}
                        </span>
                    ))}
                </div>

                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                        selected.length === 0 ? placeholder : ''
                    }
                    className="nt-multi-select-input"
                    type="text"
                    disabled={disabled}
                />
            </div>
            {open && selectTables.length > 0 && (
                <ul className={cn('nt-multi-select-dropdown')}>
                    {selectTables.map((option) => (
                        <li
                            key={option.value}
                            className="nt-multi-select-dropdown-option"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                            onClick={() => {
                                if (!disabled) {
                                    setInputValue('')
                                    setSelected((prev) => [
                                        ...prev,
                                        option
                                    ])
                                }
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MultipleSelect
