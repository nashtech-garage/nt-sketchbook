import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from './avatar'

describe('Avatar component', () => {
    it('renders fallback when no image is provided', () => {
        render(<Avatar fallBack="AB" />)
        expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('renders with image', () => {
        render(<Avatar src="/avatar.jpg" />)
        waitFor(() => {
            const image = screen.getByRole('img')
            expect(image).toHaveAttribute(
                'src',
                '/images/test-avatar.jpg',
            )
        })
    })

    it('renders badge when hasBadge is true', () => {
        render(<Avatar hasBadge />)
        expect(screen.getByRole('presentation')).toBeInTheDocument()
    })

    it.each(['xs', 'sm', 'md', 'lg'] as const)(
        'applies correct size class for size "%s"',
        async (size) => {
            render(<Avatar src="/avatar.jpg" size={size} hasBadge />)
            waitFor(async () => {
                const img = screen.getByRole('img')
                expect(img).toHaveClass(`nt-avatar-${size}`)
                const wrapper = img.parentElement
                expect(wrapper).toHaveClass(
                    `nt-avatar-wrapper-${size}`,
                )
            })
        },
    )

    it.each(['online', 'offline', 'away', 'busy'] as const)(
        'applies correct status class for status "%s"',
        (status) => {
            render(<Avatar hasBadge status={status} />)
            const badge = screen.getByRole('presentation')
            expect(badge).toHaveClass(`nt-avatar-status--${status}`)
        },
    )

    it('applies custom className and badgeClass', () => {
        render(
            <Avatar
                className="custom-wrapper"
                badgeClass="custom-badge"
                hasBadge
            />,
        )
        waitFor(() => {
            const wrapper = screen.getByRole('img').parentElement
            expect(wrapper).toHaveClass('custom-wrapper')

            const badge = screen.getByRole('presentation')
            expect(badge).toHaveClass('custom-badge')
        })
    })
})
