import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from './collapsible'

vi.mock('lucide-react', async () => {
    const actual = await vi.importActual<
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        typeof import('lucide-react')
    >('lucide-react')
    return {
        ...actual,
        ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
            <svg data-testid="chevron-icon" {...props} />
        ),
    }
})

const setup = (
    props: Partial<React.ComponentProps<typeof Collapsible>> = {},
) => {
    const onOpenChange = vi.fn()
    const utils = render(
        <Collapsible
            trigger="Click me"
            onOpenChange={onOpenChange}
            {...props}
        >
            Content
        </Collapsible>,
    )
    const trigger = screen.getByText('Click me')
    return { ...utils, trigger, onOpenChange }
}

describe('Collapsible Component', () => {
    it('renders the trigger correctly', () => {
        setup()
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('defaults to closed state when no open prop is provided', () => {
        setup()
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('toggles the content when clicking the trigger', () => {
        const { trigger } = setup()

        expect(screen.queryByText('Content')).not.toBeInTheDocument()

        fireEvent.click(trigger)
        expect(screen.getByText('Content')).toBeInTheDocument()

        fireEvent.click(trigger)
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('calls onOpenChange when toggling', () => {
        const { trigger, onOpenChange } = setup()

        fireEvent.click(trigger)
        expect(onOpenChange).toHaveBeenCalledWith(true)

        fireEvent.click(trigger)
        expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('respects controlled open state', () => {
        setup({ open: false })
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('applies custom class names', () => {
        const { container } = setup({
            classNameTrigger: 'trigger-class',
            classNameTriggerWrapper: 'wrapper-class',
            classChildren: 'content-class',
        })

        expect(
            container.querySelector('.trigger-class'),
        ).toBeInTheDocument()
        expect(
            container.querySelector('.wrapper-class'),
        ).toBeInTheDocument()
        expect(
            container.querySelector('.content-class'),
        ).toBeInTheDocument()
    })

    it('rotates the Chevron icon when open', () => {
        setup()
        const chevron = screen.getByTestId('chevron-icon')

        const trigger = screen.getByText('Click me')

        expect(chevron).not.toHaveClass('rotate-180')

        fireEvent.click(trigger)
        expect(chevron).toHaveClass('rotate-180')

        fireEvent.click(trigger)
        expect(chevron).not.toHaveClass('rotate-180')
    })
})
