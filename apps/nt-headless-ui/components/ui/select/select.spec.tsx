import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { SelectProps, SelectSize, SelectVariant } from './select'
import { Select } from './select'

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
]

const groups = [
    {
        label: 'Group 1',
        options: [
            { value: 'group1-option1', label: 'Group 1 Option 1' },
            { value: 'group1-option2', label: 'Group 1 Option 2' }
        ]
    }
]

const renderSelect = (props: Partial<SelectProps> = {}) =>
    render(<Select options={options} {...props} />)

describe('Select Component', () => {
    it('renders options correctly', () => {
        renderSelect()
        const trigger = screen.getByRole('combobox')
        fireEvent.click(trigger)
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument()
        })
    })

    it('renders groups correctly', () => {
        renderSelect({ groups })
        const trigger = screen.getByRole('combobox')
        fireEvent.click(trigger)
        groups.forEach((group) => {
            expect(screen.getByText(group.label)).toBeInTheDocument()
            group.options.forEach((option) => {
                expect(
                    screen.getByText(option.label)
                ).toBeInTheDocument()
            })
        })
    })

    it.each([
        ['default', 'nt-select-default'],
        ['danger', 'nt-select-danger'],
        ['success', 'nt-select-success'],
        ['warning', 'nt-select-warning'],
        ['bare', 'nt-select-bare']
    ])('renders with %s variant', (variant) => {
        renderSelect({ variant: variant as SelectVariant })
        const trigger = screen.getByRole('combobox')
        expect(trigger).toHaveClass(`nt-select-${variant}`)
    })

    it.each([
        ['small', 'nt-select-small'],
        ['medium', 'nt-select-medium'],
        ['large', 'nt-select-large']
    ])('renders with %s size', (size) => {
        renderSelect({ size: size as SelectSize })
        const trigger = screen.getByRole('combobox')
        expect(trigger).toHaveClass(`nt-select-${size}`)
    })

    it('calls onChange when an option is selected', () => {
        const onChange = vi.fn()
        renderSelect({ onChange })
        const trigger = screen.getByRole('combobox')
        fireEvent.click(trigger)
        const option = screen.getByText(options[1].label)
        fireEvent.click(option)
        expect(onChange).toHaveBeenCalledWith(options[1].value)
    })

    it('renders as disabled when disabled prop is true', () => {
        renderSelect({ disabled: true })
        const trigger = screen.getByRole('combobox')
        expect(trigger).toBeDisabled()
        expect(trigger).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not open options when disabled', () => {
        renderSelect({ disabled: true })
        const trigger = screen.getByRole('combobox')
        fireEvent.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('renders placeholder when no value is selected', () => {
        renderSelect({ placeholder: 'Pick one' })
        expect(screen.getByText('Pick one')).toBeInTheDocument()
    })

    it('renders selected value label', () => {
        renderSelect({ value: 'option2' })
        expect(screen.getByTestId('select-label')).toHaveTextContent(
            'Option 2'
        )
    })

    it('renders selected group value label', () => {
        renderSelect({ groups, value: 'group1-option2' })
        expect(screen.getByTestId('select-label')).toHaveTextContent(
            'Group 1 Option 2'
        )
    })

    it('renders iconLeft if provided', () => {
        renderSelect({
            iconLeft: <span data-testid="icon">Icon</span>
        })
        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
})
