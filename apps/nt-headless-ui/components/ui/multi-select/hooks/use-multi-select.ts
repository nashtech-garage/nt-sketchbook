import React, { useEffect, useMemo } from 'react'

import type { Option } from '../multi-select'

export type UseMultiSelect = {
    options: Option[]
    placeholder?: string
    initialOption?: Option[]
    onChange?: (selected: Option[]) => void
}

export const useMultiSelect = (props: UseMultiSelect) => {
    const { options, onChange, initialOption } = props
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<Option[]>(
        initialOption ?? []
    )
    const [inputValue, setInputValue] = React.useState('')

    useEffect(() => {
        if (onChange) {
            onChange(selected)
        }
    }, [selected, onChange])

    const handleUnselect = React.useCallback((framework: Option) => {
        setSelected((prev) =>
            prev.filter((s) => s.value !== framework.value)
        )
    }, [])

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current

            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        setSelected((prev) => {
                            const newSelected = [...prev]
                            newSelected.pop()
                            return newSelected
                        })
                    }
                }
                if (e.key === 'Escape') {
                    input.blur()
                }
            }
        },
        []
    )

    // Memoize filtering to avoid O(n²) computation on every render
    const selectTables = useMemo(() => {
        // Create a Set for O(1) lookup of selected values
        const selectedValues = new Set(
            selected.map((sel) => sel.value)
        )
        const lowerInputValue = inputValue.toLowerCase()

        return options.filter(
            (option) =>
                !selectedValues.has(option.value) &&
                option.label.toLowerCase().includes(lowerInputValue)
        )
    }, [options, selected, inputValue])

    return {
        inputRef,
        open,
        inputValue,
        selectTables,
        selected,
        setOpen,
        setSelected,
        setInputValue,
        handleUnselect,
        handleKeyDown
    }
}
