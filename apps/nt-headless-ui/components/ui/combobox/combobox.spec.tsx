import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { VariantCombobox } from './combobox'
import { Combobox } from './combobox'

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
]

const variantStyles = [
    {
        variant: 'default',
        description: 'Default variant with secondary border',
        className:
            'border-secondary-6 hover:border-shade-secondary-1-50 focus:border-shade-secondary-1-50',
        selectedClassName: 'bg-shade-secondary-1-10 text-text',
    },
    {
        variant: 'danger',
        description: 'Danger variant with red border',
        className:
            'border-danger hover:border-danger focus:border-danger',
        selectedClassName: 'bg-danger text-white',
    },
    {
        variant: 'success',
        description: 'Success variant with green border',
        className:
            'border-success hover:border-success focus:border-success',
        selectedClassName: 'bg-success text-white',
    },
    {
        variant: 'warning',
        description: 'Warning variant with yellow border',
        className:
            'border-warning hover:border-warning focus:border-warning',
        selectedClassName: 'bg-warning text-white',
    },
]

describe('Combobox Component', () => {
    it('renders correctly with default props', () => {
        render(<Combobox options={options} />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(
            screen.getByText('Choose an option'),
        ).toBeInTheDocument()
    })

    it('opens dropdown when clicked', async () => {
        render(<Combobox options={options} />)
        const button = screen.getByRole('combobox')
        await userEvent.click(button)

        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('closes dropdown when an option is selected', async () => {
        render(<Combobox options={options} />)
        await userEvent.click(screen.getByRole('combobox'))
        await userEvent.click(screen.getByText('Option 1'))

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('calls onChange when an option is selected', async () => {
        const handleChange = vi.fn()
        render(<Combobox options={options} onChange={handleChange} />)
        await userEvent.click(screen.getByRole('combobox'))
        await userEvent.click(screen.getByText('Option 2'))

        expect(handleChange).toHaveBeenCalledWith('option2')
    })

    it('allows searching for an option', async () => {
        render(<Combobox options={options} />)
        await userEvent.click(screen.getByRole('combobox'))
        const input = screen.getByPlaceholderText('Search')
        await userEvent.type(input, 'Option 3')

        waitFor(() =>
            expect(
                screen.queryByText('Option 3'),
            ).toBeInTheDocument(),
        )
        waitFor(() =>
            expect(
                screen.queryByText('Option 1'),
            ).not.toBeInTheDocument(),
        )
    })

    it('shows no options found message if search does not match', async () => {
        render(<Combobox options={options} />)
        await userEvent.click(screen.getByRole('combobox'))
        const input = screen.getByPlaceholderText('Search')
        await userEvent.type(input, 'Nonexistent')

        expect(
            screen.getByText('No option found.'),
        ).toBeInTheDocument()
    })

    it.each(variantStyles)(
        `$description`,
        async ({ variant, className }) => {
            render(
                <Combobox
                    options={options}
                    variant={variant as VariantCombobox}
                />,
            )
            const button = screen.getByRole('combobox')

            expect(button).toHaveClass(...className.split(' '))
        },
    )

    it.each(variantStyles)(
        'applies correct selected variant styles for $variant',
        async ({ variant, selectedClassName }) => {
            render(
                <Combobox
                    options={options}
                    variant={variant as VariantCombobox}
                />,
            )
            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.click(screen.getByText('Option 1'))
            waitFor(() => {
                const selectedOption = screen.queryByRole('option')
                expect(selectedOption).toHaveClass(selectedClassName)
            })
        },
    )
})
