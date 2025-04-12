import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Popover } from './popover'
import type {
    Align,
    PopoverProps,
    PopoverVariant,
    Side,
} from './popover'

describe('Popover', () => {
    const defaultProps: PopoverProps = {
        trigger: <button>Open Popover</button>,
        children: <div>Popover Content</div>,
    }

    it('renders the trigger element', () => {
        render(<Popover {...defaultProps} />)
        expect(screen.getByText('Open Popover')).toBeInTheDocument()
    })

    it('does not show the content initially', () => {
        render(<Popover {...defaultProps} />)
        expect(
            screen.queryByText('Popover Content'),
        ).not.toBeInTheDocument()
    })

    it('shows the content when trigger is clicked', async () => {
        render(<Popover {...defaultProps} />)
        await userEvent.click(screen.getByText('Open Popover'))
        expect(
            screen.getByText('Popover Content'),
        ).toBeInTheDocument()
    })

    it.each([
        ['default', 'bg-gray-800 text-white', 'fill-gray-800'],
        ['danger', 'bg-danger text-white', 'fill-danger'],
        ['warning', 'bg-warning text-black', 'fill-warning'],
        ['success', 'bg-success text-white', 'fill-success'],
        ['info', 'bg-info text-white', 'fill-info'],
    ])(
        'applies correct classes for variant: %s',
        async (variant, expectedContentClass, expectedArrowClass) => {
            render(
                <Popover
                    {...defaultProps}
                    variant={variant as PopoverVariant}
                    className="custom-class"
                    classNameArrow="custom-arrow-class"
                />,
            )

            await userEvent.click(screen.getByText('Open Popover'))

            const content = screen.getByText('Popover Content')
            expect(content.parentElement).toHaveClass(
                ...expectedContentClass.split(' '),
            )
            expect(content.parentElement).toHaveClass('custom-class')

            const arrow = screen.getByRole('presentation')
            expect(arrow).toHaveClass(
                ...expectedArrowClass.split(' '),
            )
            expect(arrow).toHaveClass('custom-arrow-class')
        },
    )

    it.each([
        ['top', 'start'],
        ['bottom', 'center'],
        ['left', 'end'],
        ['right', 'center'],
    ])(
        'applies correct side (%s) and align (%s) attributes',
        async (side, align) => {
            render(
                <Popover
                    {...defaultProps}
                    side={side as Side}
                    align={align as Align}
                />,
            )
            await userEvent.click(screen.getByText('Open Popover'))

            const content = screen.getByText('Popover Content')
            expect(
                content?.parentElement?.getAttribute('data-side'),
            ).toBe(side)
            expect(
                content?.parentElement?.getAttribute('data-align'),
            ).toBe(align)
        },
    )
})
