import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tooltip, TooltipPosition, TooltipProps } from './tooltip'

const renderTooltip = (props: Partial<TooltipProps> = {}) => {
    return render(
        <Tooltip trigger="Hover me" {...props}>
            Tooltip content
        </Tooltip>,
    )
}
const getToolTipContent = async () =>
    waitFor(() => screen.getByText('Tooltip content'))

const getTooltipTrigger = () => screen.getByText('Hover me')

describe('Tooltip', () => {
    it('renders the tooltip trigger', () => {
        renderTooltip()
        expect(getTooltipTrigger()).toBeInTheDocument()
    })

    it('shows the tooltip content on hover', async () => {
        renderTooltip()
        const trigger = getTooltipTrigger()
        await userEvent.hover(trigger)
        waitFor(() => expect(getToolTipContent()).toBeInTheDocument())
    })

    it('hides the tooltip content when not hovered', () => {
        renderTooltip()
        expect(
            screen.queryByText('Tooltip content'),
        ).not.toBeInTheDocument()
    })

    it.each([
        ['danger', 'bg-danger text-white'],
        ['success', 'bg-success text-black'],
        ['warning', 'bg-warning text-black'],
        ['info', 'bg-info text-white'],
    ])(
        'applies the correct variant classes: %s',
        async (variant: string, expectedClasses: string) => {
            renderTooltip({
                variant: variant as TooltipProps['variant'],
            })
            const trigger = getTooltipTrigger()
            await userEvent.hover(trigger)
            const tooltipContent = getToolTipContent()
            waitFor(() =>
                expect(tooltipContent).toHaveClass(expectedClasses),
            )
        },
    )

    it.each([
        ['top', 'top'],
        ['right', 'right'],
        ['bottom', 'bottom'],
        ['left', 'left'],
    ])(
        'applies the correct position: %s',
        async (position: string, expected) => {
            renderTooltip({ position: position as TooltipPosition })
            const trigger = getTooltipTrigger()
            await userEvent.hover(trigger)
            const tooltipContent = getToolTipContent()
            waitFor(() =>
                expect(tooltipContent).toHaveAttribute(
                    'data-side',
                    expected,
                ),
            )
        },
    )

    it('renders custom class names', async () => {
        renderTooltip({
            className: 'custom-class',
            classNameArrow: 'custom-arrow-class',
        })
        const trigger = getTooltipTrigger()
        await userEvent.hover(trigger)
        const tooltipContent = getToolTipContent()
        waitFor(() =>
            expect(tooltipContent).toHaveClass('custom-class'),
        )
        waitFor(() => {
            const arrow = screen
                .getByRole('tooltip')
                .querySelector('svg')
            expect(arrow).toHaveClass('custom-arrow-class')
        })
    })
})
