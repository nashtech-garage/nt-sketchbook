import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from './collapsible'

vi.mock('lucide-react', () => ({
    ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
        <svg data-testid="chevron-icon" {...props} />
    )
}))

const onOpenChange = vi.fn()

const defaultProps: React.ComponentProps<typeof Collapsible> = {
    trigger: 'Click me',
    onOpenChange,
    children: 'Content',
    shouldDisplayArrow: true
}

const setup = (
    props: Partial<React.ComponentProps<typeof Collapsible>> = {}
) => render(<Collapsible {...defaultProps} {...props} />)

describe('Collapsible Component', () => {
    it('renders the trigger correctly', () => {
        setup()
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('defaults to closed state when no open prop is provided', () => {
        setup()
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('toggles the content when clicking the trigger', async () => {
        setup()
        const trigger = screen.getByText('Click me')

        expect(screen.queryByText('Content')).not.toBeInTheDocument()

        await userEvent.click(trigger)
        expect(screen.getByText('Content')).toBeInTheDocument()

        await userEvent.click(trigger)
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('calls onOpenChange when toggling', async () => {
        setup({ onOpenChange })
        const trigger = screen.getByText('Click me')

        await userEvent.click(trigger)
        expect(onOpenChange).toHaveBeenCalledWith(true)

        await userEvent.click(trigger)
        expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('respects controlled open state', () => {
        setup({ open: false })
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('applies custom class names', () => {
        setup({ classNameTriggerWrapper: 'wrapper-class' })
        expect(
            document.querySelector('.wrapper-class')
        ).toBeInTheDocument()
    })

    it('rotates the Chevron icon when open', async () => {
        setup()
        const chevron = screen.getByTestId('chevron-icon')
        const trigger = screen.getByText('Click me')

        await userEvent.click(trigger)
        expect(chevron).toHaveClass('down')

        await userEvent.click(trigger)
        expect(chevron).toHaveClass('up')
    })

    it('does not render Chevron icon when shouldDisplayArrow is false', () => {
        setup({ shouldDisplayArrow: false })

        expect(
            screen.queryByTestId('chevron-icon')
        ).not.toBeInTheDocument()
    })
})
