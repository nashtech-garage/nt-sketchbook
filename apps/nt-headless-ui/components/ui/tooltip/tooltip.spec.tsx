import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { TooltipPosition, TooltipProps } from './tooltip'
import { Tooltip } from './tooltip'

const defaultProps: TooltipProps = {
    children: 'Tooltip content',
    trigger: 'Hover me',
    variant: 'default',
    position: 'top',
    className: '',
    classNameArrow: ''
}

const setup = async (props?: Partial<TooltipProps>) => {
    render(<Tooltip {...defaultProps} {...props} />)
}

const getToolTipContent = async () =>
    waitFor(() => screen.getByText('Tooltip content'))

const getTooltipTrigger = () => screen.getByText('Hover me')

const hoverToShowTooltip = async () => {
    const trigger = getTooltipTrigger()
    await userEvent.hover(trigger)
    return getToolTipContent()
}

describe('Tooltip', () => {
    it('renders the tooltip trigger', () => {
        setup()

        expect(getTooltipTrigger()).toBeInTheDocument()
    })

    it('shows the tooltip content on hover', async () => {
        setup()
        const trigger = getTooltipTrigger()
        await userEvent.hover(trigger)

        waitFor(() => expect(getToolTipContent()).toBeInTheDocument())
    })

    it('hides the tooltip content when not hovered', () => {
        setup()

        expect(
            screen.queryByText('Tooltip content')
        ).not.toBeInTheDocument()
    })

    it.each([
        ['danger', 'nt-tooltip-danger'],
        ['success', 'nt-tooltip-success'],
        ['warning', 'nt-tooltip-warning'],
        ['info', 'nt-tooltip-info']
    ])(
        'applies the correct variant classes: %s',
        async (variant: string, expectedClasses: string) => {
            setup({
                variant: variant as TooltipProps['variant']
            })
            const trigger = getTooltipTrigger()
            await userEvent.hover(trigger)
            const tooltipContent = getToolTipContent()

            waitFor(() =>
                expect(tooltipContent).toHaveClass(expectedClasses)
            )
        }
    )

    it.each([
        ['top', 'top'],
        ['right', 'right'],
        ['bottom', 'bottom'],
        ['left', 'left']
    ])(
        'applies the correct position: %s',
        async (position: string, expected) => {
            setup({ position: position as TooltipPosition })

            const tooltipContent = hoverToShowTooltip()

            waitFor(() =>
                expect(tooltipContent).toHaveAttribute(
                    'data-side',
                    expected
                )
            )
        }
    )

    it('renders custom class names', async () => {
        setup({
            className: 'custom-class',
            classNameArrow: 'custom-arrow-class'
        })

        const tooltipContent = hoverToShowTooltip()

        waitFor(() =>
            expect(tooltipContent).toHaveClass('custom-class')
        )

        waitFor(() => {
            const arrow = screen
                .getByRole('tooltip')
                .querySelector('svg')
            expect(arrow).toHaveClass('custom-arrow-class')
        })
    })
})
