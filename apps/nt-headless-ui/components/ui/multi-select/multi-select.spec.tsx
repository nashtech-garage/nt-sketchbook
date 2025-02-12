import { fireEvent, render, screen } from '@testing-library/react'
import { User } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'

import {
    MultipleSelect,
    MultipleSelectProps,
    MultipleSelectVariant,
    Option,
    variantIcon,
    variantStyles,
} from './multi-select'

const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
]

describe('MultipleSelect', () => {
    const setup = (props: Partial<MultipleSelectProps> = {}) => {
        const onChangeMock = vi.fn()
        render(
            <MultipleSelect
                options={options}
                onChange={onChangeMock}
                {...props}
            />,
        )
        return { onChangeMock }
    }

    it('renders correctly with placeholder', () => {
        setup({ placeholder: 'Select options' })
        expect(
            screen.getByPlaceholderText('Select options'),
        ).toBeInTheDocument()
    })

    it('opens dropdown on input focus', () => {
        setup()
        const input = screen.getByPlaceholderText('')
        fireEvent.focus(input)
        expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('selects an option', () => {
        const { onChangeMock } = setup()
        fireEvent.focus(screen.getByPlaceholderText(''))
        const option = screen.getByText('Option 1')
        fireEvent.click(option)
        expect(onChangeMock).toHaveBeenCalledWith([
            { value: 'option1', label: 'Option 1' },
        ])
    })

    it('removes selected option', () => {
        const { onChangeMock } = setup({
            initialOption: [options[0]],
        })
        const removeButton = screen.getByTestId(
            'remove-' + options[0].value,
        )
        fireEvent.click(removeButton)
        expect(onChangeMock).toHaveBeenCalledWith([])
    })

    it('disables input when disabled prop is set', () => {
        setup({ disabled: true })
        const input = screen.getByTestId('multi-select-input')
        expect(input).toBeDisabled()
    })

    it.each(Object.entries(variantStyles))(
        'applies correct styles for variant: %s',
        (variant, expectedStyle) => {
            setup({
                variant: variant as MultipleSelectVariant,
            })
            const container = screen.getByTestId('multi-select')
            expect(container).toHaveClass(expectedStyle)
        },
    )

    it('renders iconLeft when provided', () => {
        setup({
            iconLeft: <User data-testid="icon-left" />,
        })
        expect(screen.getByTestId('icon-left')).toBeInTheDocument()
    })

    it('applies correct class to iconLeft', () => {
        setup({
            iconLeft: <User data-testid="icon-left" />,
            classIconLeft: 'custom-class',
        })
        expect(screen.getByTestId('icon-left')).toHaveClass(
            'custom-class',
        )
    })

    it.each(Object.entries(variantIcon))(
        'applies correct styles for variant icon: %s',
        (variant, expectedStyle) => {
            setup({
                variant: variant as MultipleSelectVariant,
                iconLeft: <User data-testid="icon-left" />,
            })
            const container = screen.getByTestId('icon-left')
            expect(container).toHaveClass(expectedStyle)
        },
    )

    it('applies correct class when disabled', () => {
        setup({
            disabled: true,
            iconLeft: <User data-testid="icon-left" />,
        })
        const container = screen.getByTestId('multi-select')
        expect(container).toHaveClass(
            'bg-shade-neutral-9 hover:border-shade-neutral-40 border-shade-neutral-40',
        )

        const icon = screen.getByTestId('icon-left')
        expect(icon).toHaveClass(
            'group-hover:text-shade-neutral-40 text-shade-neutral-40',
        )
    })

    it('selects two options and calls onChange with both', () => {
        const onChangeMock = vi.fn()
        setup({
            onChange: onChangeMock,
            placeholder: 'Select options',
        })

        const input = screen.getByPlaceholderText('Select options')

        fireEvent.focus(input)
        fireEvent.click(screen.getByText('Option 1'))

        fireEvent.focus(input)
        fireEvent.click(screen.getByText('Option 2'))

        expect(onChangeMock).toHaveBeenCalledWith([
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
        ])
    })
})
