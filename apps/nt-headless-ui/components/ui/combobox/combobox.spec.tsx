import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Combobox } from './combobox'

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
]

describe('Combobox Component', () => {
    it('renders correctly with default props', () => {
        render(<Combobox options={options} />)

        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(
            screen.getByText('Choose an option')
        ).toBeInTheDocument()
    })

    it('opens dropdown when clicked', async () => {
        const wrapper = render(<Combobox options={options} />)
        const button = screen.getByRole('button')
        await userEvent.click(button)
        await waitFor(() => {
            expect(
                wrapper.container.querySelector(
                    '.nt-combobox-popover'
                )
            ).toBeInTheDocument()
        })
    })

    it('closes dropdown when an option is selected', async () => {
        const wrapper = render(<Combobox options={options} />)
        const button = screen.getByRole('button')
        await userEvent.click(button)
        await waitFor(() => {
            const popover = wrapper.container.querySelector(
                '.nt-combobox-popover'
            )
            expect(popover).toBeInTheDocument()
            const options = popover?.querySelectorAll(
                '.nt-combobox-list-item'
            )
            expect(options?.length).toBe(3)
            const selectedOption = options?.[0]
            expect(selectedOption).toHaveTextContent('Option 1')
        })
    })

    it('calls onChange when an option is selected', async () => {
        const handleChange = vi?.fn()
        const wrapper = render(
            <Combobox options={options} onChange={handleChange} />
        )
        const button = screen.getByRole('button')
        await userEvent.click(button)
        await waitFor(() => {
            const popover = wrapper.container.querySelector(
                '.nt-combobox-popover'
            )
            expect(popover).toBeInTheDocument()
            const options =
                popover?.querySelectorAll('.nt-combobox-list-item') ||
                []
            expect(options?.length).toBe(3)
            const selectedOption = options[1]
            expect(selectedOption).toHaveTextContent('Option 2')
            userEvent.click(selectedOption)
            expect(handleChange).toHaveBeenCalledWith({
                label: 'Option 2',
                value: 'option2'
            })
        })
    })

    it('allows searching for an option', async () => {
        const handleChange = vi?.fn()
        const wrapper = render(
            <Combobox options={options} onChange={handleChange} />
        )
        const button = screen.getByRole('button')
        await userEvent.click(button)
        await waitFor(() => {
            const popover = wrapper.container.querySelector(
                '.nt-combobox-popover'
            )
            expect(popover).toBeInTheDocument()
            const input = screen.getByPlaceholderText('Search')
            expect(input).toBeInTheDocument()
            userEvent.keyboard('3')
            screen.debug(undefined, Infinity)

            const options = popover?.querySelectorAll(
                '.nt-combobox-list-item'
            )
            expect(options?.length).toBe(1)
            expect(screen.queryByText('Option 3')).toBeInTheDocument()
            expect(
                screen.queryByText('Option 1')
            ).not.toBeInTheDocument()
        })
    })

    it('shows no options found message if search does not match', async () => {
        const wrapper = render(<Combobox options={options} />)
        const button = screen.getByRole('button')
        await userEvent.click(button)
        await waitFor(() => {
            const popover = wrapper.container.querySelector(
                '.nt-combobox-popover'
            )
            expect(popover).toBeInTheDocument()
            const input = screen.getByPlaceholderText('Search')
            expect(input).toBeInTheDocument()
            userEvent.type(input, 'Nonexistent')
            const options = popover?.querySelectorAll(
                '.nt-combobox-list-item'
            )
            expect(options?.length).toBe(0)
            const result = wrapper.getByText('No option found.')
            expect(result).toBeInTheDocument()
        })
    })
})
