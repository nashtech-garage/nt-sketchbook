import {
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { TooltipPosition } from './tooltip'
import { Tooltip } from './tooltip'

describe('Tooltip', () => {
    it('applies the correct position class', () => {
        const positions: Array<TooltipPosition> = [
            'top',
            'right',
            'bottom',
            'left'
        ]
        const { rerender } = render(
            <Tooltip position="top">Tooltip content</Tooltip>
        )

        positions.forEach((position) => {
            rerender(
                <Tooltip position={position}>Tooltip content</Tooltip>
            )
            expect(
                screen
                    .getByText('Tooltip content')
                    .closest('.nt-tooltip')
            ).toHaveClass(`nt-tooltip-${position}`)
        })
    })
    it('renders custom children content', () => {
        render(
            <Tooltip>
                <h1>Custom Children</h1>
            </Tooltip>
        )
        expect(
            screen.getByRole('heading', { name: 'Custom Children' })
        ).toBeInTheDocument()
    })
    it('renders custom trigger content', () => {
        render(
            <Tooltip trigger={<button>Click Me</button>}>
                Test Content
            </Tooltip>
        )
        expect(
            screen.getByRole('button', { name: 'Click Me' })
        ).toBeInTheDocument()
    })
    it('applies additional className to the tooltip content', async () => {
        render(
            <Tooltip className="my-custom-class">
                Test Content
            </Tooltip>
        )
        const triggerElement = screen.getByText('Hover')
        expect(triggerElement).toBeInTheDocument()
        fireEvent.mouseEnter(triggerElement)
        await waitFor(() => {
            const contentElement = screen.getByText('Test Content')
            expect(contentElement).toBeInTheDocument()
            expect(contentElement).toHaveClass('my-custom-class')
        })
    })
})
