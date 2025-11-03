import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Dropdown, type DropdownProps } from './dropdown'

const defaultItems = [
    { label: 'Item 1', onClick: vi.fn() },
    { divider: true },
    { label: 'Danger Item', danger: true }
]

const defaultProps: DropdownProps = {
    label: 'Menu',
    placement: 'down',
    items: defaultItems
}

const user = userEvent.setup()

const setup = (props: Partial<DropdownProps> = {}) =>
    render(<Dropdown {...defaultProps} {...props} />)

describe('Dropdown', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with default label', () => {
        setup()
        expect(
            screen.getByRole('button', { name: /menu/i })
        ).toBeInTheDocument()
    })

    it('opens and closes menu on button click', async () => {
        setup()

        const trigger = screen.getByRole('button', { name: /menu/i })
        expect(trigger).toHaveAttribute('aria-expanded', 'false')

        await user.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText('Item 1')).toBeInTheDocument()

        await user.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes when clicking outside', async () => {
        setup()

        const trigger = screen.getByRole('button', { name: /menu/i })
        await user.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'true')

        await user.click(document.body)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('calls onClick handler and closes after item click', async () => {
        setup()

        const trigger = screen.getByRole('button', { name: /menu/i })
        await user.click(trigger)

        const item = screen.getByText('Item 1')
        await user.click(item)

        expect(defaultItems[0].onClick).toHaveBeenCalledTimes(1)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('renders divider correctly', async () => {
        setup()

        const trigger = screen.getByRole('button', { name: /menu/i })
        await user.click(trigger)

        expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('renders split button layout when children are provided', () => {
        setup({
            children: <button>Primary Action</button>
        })

        expect(screen.getByText('Primary Action')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /menu/i })
        ).toBeInTheDocument()
    })

    it('applies custom class names', () => {
        const { container } = setup({ className: 'custom-dropdown' })
        expect(
            container.querySelector('.custom-dropdown')
        ).toBeInTheDocument()
    })

    it('supports different placements', () => {
        const { rerender, container } = setup({ placement: 'up' })
        expect(container.querySelector('.is-up')).toBeInTheDocument()

        rerender(<Dropdown {...defaultProps} placement="right" />)
        expect(
            container.querySelector('.is-right')
        ).toBeInTheDocument()
    })
})
