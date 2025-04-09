import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { SelectProps, SelectSize, SelectVariant } from './select'
import { Select } from './select'

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
]

const groups = [
    {
        label: 'Group 1',
        options: [
            { value: 'group1-option1', label: 'Group 1 Option 1' },
            { value: 'group1-option2', label: 'Group 1 Option 2' },
        ],
    },
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
                    screen.getByText(option.label),
                ).toBeInTheDocument()
            })
        })
    })

    it.each([
        [
            'default',
            'border-secondary-6 hover:border-shade-secondary-1-50',
        ],
        [
            'danger',
            'border-danger hover:border-danger focus:border-danger',
        ],
        [
            'success',
            'border-success hover:border-success focus:border-success',
        ],
        [
            'warning',
            'border-warning hover:border-warning focus:border-warning',
        ],
    ])('renders with %s variant', (variant, expectedClass) => {
        renderSelect({ variant: variant as SelectVariant })
        const trigger = screen.getByRole('combobox')
        expect(trigger).toHaveClass(expectedClass)
    })

    it.each([
        ['small', 'text-sm py-1 px-2'],
        ['medium', 'text-base py-2 px-3'],
        ['large', 'text-lg py-3 px-4'],
    ])('renders with %s size', (size, expectedClass) => {
        renderSelect({ size: size as SelectSize })
        const trigger = screen.getByRole('combobox')
        expect(trigger).toHaveClass(expectedClass)
    })

    it.each([
        [
            'default',
            'group-hover:text-shade-secondary-1-50 group-focus:text-shade-secondary-1-50',
        ],
        ['danger', 'group-hover:text-danger group-focus:text-danger'],
        [
            'success',
            'group-hover:text-success group-focus:text-success',
        ],
        [
            'warning',
            'group-hover:text-warning group-focus:text-warning',
        ],
    ])(
        'renders icon with %s variant style',
        (variant, expectedClass) => {
            renderSelect({
                variant: variant as SelectVariant,
                iconLeft: <span>Icon</span>,
            })
            const trigger = screen.getByRole('combobox')
            fireEvent.click(trigger)
            const icon = screen.getByText('Icon')
            expect(icon).toHaveClass(expectedClass)
        },
    )
})
