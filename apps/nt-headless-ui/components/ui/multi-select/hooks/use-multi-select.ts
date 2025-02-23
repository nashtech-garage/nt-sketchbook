import React from 'react'

import { Option } from '../multi-select'

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
        initialOption ?? [],
    )
    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        if (onChange) {
            onChange(selected)
        }
    }, [selected, onChange])

    const handleUnselect = React.useCallback((framework: Option) => {
        setSelected((prev) =>
            prev.filter((s) => s.value !== framework.value),
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
        [],
    )

    const selectTables = options.filter(
        (option) =>
            !selected.some((sel) => sel.value === option.value),
    )

    return {
        inputRef,
        open,
        setOpen,
        selected,
        setSelected,
        inputValue,
        setInputValue,
        handleUnselect,
        handleKeyDown,
        selectTables,
    }
}
