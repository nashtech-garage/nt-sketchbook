import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Popover } from './popover'
import type { PopoverProps, PopoverVariant, Side } from './popover'

const defaultProps: PopoverProps = {
    trigger: <button>Open Popover</button>,
    children: <div>Popover Content</div>,
    side: 'right'
}

const setup = (props?: Partial<PopoverProps>) => {
    render(<Popover {...defaultProps} {...props} />)
}

describe('Popover', () => {
    it('renders the trigger element', () => {
        setup()
        expect(screen.getByText('Open Popover')).toBeInTheDocument()
    })

    it('does not show the content initially', () => {
        setup()
        expect(
            screen.queryByText('Popover Content')
        ).not.toBeInTheDocument()
    })

    it('shows the content when trigger is clicked', async () => {
        setup()
        await userEvent.click(screen.getByText('Open Popover'))
        expect(
            screen.getByText('Popover Content')
        ).toBeInTheDocument()
    })

    it.each([
        ['default', 'nt-popover-default'],
        ['danger', 'nt-popover-danger'],
        ['warning', 'nt-popover-warning'],
        ['success', 'nt-popover-success'],
        ['info', 'nt-popover-info']
    ])(
        'applies correct classes for variant: %s',
        async (variant, expectedClass) => {
            setup({
                variant: variant as PopoverVariant,
                className: 'custom-class'
            })

            await userEvent.click(screen.getByText('Open Popover'))

            const content =
                screen.getByText('Popover Content').parentElement
            expect(content).toHaveClass(
                'nt-popover',
                'show',
                expectedClass,
                'custom-class'
            )

            const arrow = screen.getByRole('presentation')
            expect(arrow).toHaveClass('arrow-svg')
        }
    )

    it.each([
        ['top', 'center'],
        ['bottom', 'center'],
        ['left', 'center'],
        ['right', 'center']
    ])(
        'applies correct side (%s) and align (%s) attributes',
        async (side, align) => {
            setup({
                side: side as Side
            })

            await userEvent.click(screen.getByText('Open Popover'))

            const content = await screen.getByText('Popover Content')
                .parentElement
            expect(content?.getAttribute('data-side')).toBe(side)
            expect(content?.getAttribute('data-align')).toBe(align)
        }
    )
})
