import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Combobox, type ComboboxProps } from './combobox'

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
]

const defaultProps: ComboboxProps = {
    options,
    placeholder: 'Choose an option',
    searchText: 'Search',
    noFoundText: 'No option found.',
    onChange: vi.fn()
}

const setup = (props: Partial<ComboboxProps> = {}) =>
    render(<Combobox {...defaultProps} {...props} />)

describe('Combobox', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with placeholder by default', () => {
        setup()
        expect(
            screen.getByRole('button', { name: /choose an option/i })
        ).toBeInTheDocument()
    })

    it('opens and closes dropdown on trigger click', async () => {
        setup()
        const user = userEvent.setup()

        const trigger = screen.getByRole('button', {
            name: /choose an option/i
        })
        await user.click(trigger)

        expect(screen.getByPlaceholderText('Search')).toHaveFocus()
        expect(screen.getByText('Option 1')).toBeInTheDocument()

        await user.click(trigger)
        expect(
            screen
                .getByPlaceholderText('Search')
                .closest('.nt-combobox-popover')
        ).not.toHaveClass('show')
    })

    it('selects an option and calls onChange', async () => {
        const handleChange = vi.fn()
        setup({ onChange: handleChange })
        const user = userEvent.setup()

        const trigger = screen.getByRole('button', {
            name: /choose an option/i
        })
        await user.click(trigger)

        const option2 = screen.getByRole('button', {
            name: 'Option 2'
        })
        await user.click(option2)

        expect(trigger).toHaveTextContent('Option 2')
        expect(handleChange).toHaveBeenCalledWith({
            value: 'option2',
            label: 'Option 2'
        })
    })

    it('does not call onChange if the same option is reselected', async () => {
        const handleChange = vi.fn()
        setup({ onChange: handleChange })
        const user = userEvent.setup()

        const trigger = screen.getByRole('button', {
            name: /choose an option/i
        })
        await user.click(trigger)

        const option1 = screen.getByRole('button', {
            name: 'Option 1'
        })
        await user.click(option1)
        expect(handleChange).toHaveBeenCalledTimes(1)

        await user.click(trigger)
        await user.click(option1)
        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('filters options based on input text', async () => {
        setup()
        const user = userEvent.setup()

        const trigger = screen.getByRole('button', {
            name: /choose an option/i
        })
        await user.click(trigger)

        const input = screen.getByPlaceholderText('Search')
        await user.type(input, '3')

        expect(screen.getByText('Option 3')).toBeInTheDocument()
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })

    it('shows no results message when no matches', async () => {
        setup({ noFoundText: 'Nothing found' })
        const user = userEvent.setup()

        const trigger = screen.getByRole('button', {
            name: /choose an option/i
        })
        await user.click(trigger)

        const input = screen.getByPlaceholderText('Search')
        await user.type(input, 'zzz')

        expect(screen.getByText('Nothing found')).toBeInTheDocument()
    })

    it('applies custom class names', () => {
        const { container } = setup({
            className: 'custom-wrapper',
            classOption: 'custom-popover'
        })

        expect(
            container.querySelector('.custom-wrapper')
        ).toBeInTheDocument()
        expect(
            container.querySelector('.custom-popover')
        ).toBeInTheDocument()
    })

    it('uses custom placeholder and searchText', async () => {
        setup({
            placeholder: 'Pick something',
            searchText: 'Type here...'
        })
        const user = userEvent.setup()

        expect(
            screen.getByRole('button', { name: /pick something/i })
        ).toBeInTheDocument()

        const trigger = screen.getByRole('button', {
            name: /pick something/i
        })
        await user.click(trigger)

        expect(
            screen.getByPlaceholderText('Type here...')
        ).toBeInTheDocument()
    })
})
