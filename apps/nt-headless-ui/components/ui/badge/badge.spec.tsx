import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Badge,
    type BadgeIconPosition,
    type BadgeSize,
    type BadgeVariant
} from './badge'

describe('Badge component', () => {
    it('renders children content', () => {
        render(<Badge>Test Badge</Badge>)
        expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })

    it.each([['danger'], ['info'], ['success'], ['warning']])(
        'applies variant class for variant=%s',
        (variant) => {
            const { container } = render(
                <Badge variant={variant as BadgeVariant}>Badge</Badge>
            )
            const badge = container.firstChild as HTMLElement
            expect(badge.className).toContain(`nt-badge-${variant}`)
        }
    )

    it.each([['small'], ['large']])(
        'applies size class for size=%s',
        (size) => {
            const { container } = render(
                <Badge size={size as BadgeSize}>Badge</Badge>
            )
            const badge = container.firstChild as HTMLElement
            expect(badge.className).toContain(`nt-badge-${size}`)
        }
    )

    it.each([
        [true, 'nt-badge-rounded'],
        [false, undefined]
    ])(
        'conditionally applies rounded class when rounded=%s',
        (rounded, expectedClass) => {
            const { container } = render(
                <Badge rounded={rounded}>Badge</Badge>
            )
            const badge = container.firstChild as HTMLElement

            if (expectedClass) {
                expect(badge.className).toContain(expectedClass)
            } else {
                expect(badge.className).not.toContain(
                    'nt-badge-rounded'
                )
            }
        }
    )

    it.each([
        ['left', 'nt-mr-2'],
        ['right', 'nt-ml-2']
    ])(
        'renders icon on the %s with correct margin class',
        (position, expectedClass) => {
            render(
                <Badge
                    icon={<span data-testid="icon">Icon</span>}
                    iconPosition={position as BadgeIconPosition}>
                    Badge
                </Badge>
            )
            const icon = screen.getByTestId('icon')
            expect(icon.parentElement).toHaveClass(expectedClass)
        }
    )
})
