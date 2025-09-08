import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import type { UseMultiSelect } from './use-multi-select'
import { useMultiSelect } from './use-multi-select'

const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
]

const mockOnChange = vi.fn()
const mockPlaceholder = 'Select options'

const defaultProps: UseMultiSelect = {
    options,
    initialOption: [options[0]],
    onChange: mockOnChange,
    placeholder: mockPlaceholder
}

const setup = (props?: Partial<UseMultiSelect>) =>
    renderHook(() =>
        useMultiSelect({
            ...defaultProps,
            ...props
        })
    )

describe('useMultiSelect Hook', () => {
    it('sets initial state correctly', () => {
        const { result } = setup({
            initialOption: [options[0]]
        })

        expect(result.current.selected).toEqual([options[0]])
    })

    it('calls onChange when selection changes', () => {
        const { result } = setup()

        act(() => {
            result.current.setSelected([options[1]])
        })

        expect(mockOnChange).toHaveBeenCalledWith([options[1]])
    })

    it('removes option when unselecting', () => {
        const { result } = setup({
            initialOption: [options[0]]
        })

        act(() => {
            result.current.handleUnselect(options[0])
        })

        expect(result.current.selected).toEqual([])
    })

    it('removes last selected option on Backspace key', () => {
        const mockInputElement = { value: '' } as HTMLInputElement

        vi.spyOn(React, 'useRef').mockReturnValue({
            current: mockInputElement
        })

        const { result } = setup({
            initialOption: [options[0], options[1]]
        })

        const mockEvent = {
            key: 'Backspace',
            currentTarget: { value: '' }
        } as unknown as React.KeyboardEvent<HTMLDivElement>

        act(() => {
            result.current.handleKeyDown(mockEvent)
        })

        expect(result.current.selected).toEqual([options[0]])
    })

    it('blurs input on Escape key', () => {
        const mockBlur = vi.fn()
        const mockInputElement = {
            value: '',
            blur: mockBlur
        } as unknown as HTMLInputElement

        vi.spyOn(React, 'useRef').mockReturnValue({
            current: mockInputElement
        })

        const { result } = setup()

        act(() => {
            result.current.handleKeyDown({
                key: 'Escape',
                currentTarget: {}
            } as React.KeyboardEvent<HTMLDivElement>)
        })

        expect(mockBlur).toHaveBeenCalled()
    })

    it('filters available options correctly', () => {
        const { result } = setup({
            initialOption: [options[0]]
        })
        expect(result.current.selectTables).toEqual([
            options[1],
            options[2]
        ])
    })

    it('filters available options by excluding selected and matching inputValue', () => {
        const { result } = setup()

        act(() => {
            result.current.setInputValue('2')
        })

        expect(result.current.selectTables).toEqual([options[1]])
    })
})
