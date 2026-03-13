import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Combobox, type ComboboxProps } from './combobox'

const mockOption1 = 'Option 1'
const mockOption2 = 'Option 2'
const mockOption3 = 'Option 3'

const options = [
    { value: 'option1', label: mockOption1 },
    { value: 'option2', label: mockOption2 },
    { value: 'option3', label: mockOption3 }
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

const getTrigger = (name: RegExp = /choose an option/i) =>
    screen.getByRole('button', { name })

const openCombobox = async (name: RegExp = /choose an option/i) => {
    await userEvent.click(getTrigger(name))
}

describe('Combobox', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with placeholder by default', () => {
        setup()

        expect(getTrigger()).toBeInTheDocument()
    })

    it('opens and closes dropdown on trigger click', async () => {
        setup()

        const trigger = getTrigger()

        await openCombobox()

        expect(screen.getByPlaceholderText('Search')).toHaveFocus()
        expect(screen.getByText(mockOption1)).toBeInTheDocument()

        await userEvent.click(trigger)

        expect(
            screen
                .getByPlaceholderText('Search')
                .closest('.nt-combobox-popover')
        ).not.toHaveClass('show')
    })

    it('selects an option and calls onChange', async () => {
        const handleChange = vi.fn()
        setup({ onChange: handleChange })

        const trigger = getTrigger()

        await openCombobox()

        await userEvent.click(
            screen.getByRole('button', { name: mockOption2 })
        )

        expect(trigger).toHaveTextContent(mockOption2)

        expect(handleChange).toHaveBeenCalledWith({
            value: 'option2',
            label: mockOption2
        })
    })

    it('does not call onChange if the same option is reselected', async () => {
        const handleChange = vi.fn()
        setup({ onChange: handleChange })

        const trigger = getTrigger()

        await openCombobox()

        const option1 = screen.getByRole('button', {
            name: mockOption1
        })

        await userEvent.click(option1)
        expect(handleChange).toHaveBeenCalledTimes(1)

        await userEvent.click(trigger)
        await userEvent.click(option1)

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('filters options based on input text', async () => {
        setup()

        await openCombobox()

        const input = screen.getByPlaceholderText('Search')

        await userEvent.type(input, '3')

        expect(screen.getByText(mockOption3)).toBeInTheDocument()
        expect(
            screen.queryByText(mockOption1)
        ).not.toBeInTheDocument()
    })

    it('shows no results message when no matches', async () => {
        setup({ noFoundText: 'Nothing found' })

        await openCombobox()

        const input = screen.getByPlaceholderText('Search')

        await userEvent.type(input, 'zzz')

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

        expect(getTrigger(/pick something/i)).toBeInTheDocument()

        await openCombobox(/pick something/i)

        expect(
            screen.getByPlaceholderText('Type here...')
        ).toBeInTheDocument()
    })
})
