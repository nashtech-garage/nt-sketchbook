import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, type AvatarProps } from './avatar'

const defaultProps: AvatarProps = {
    src: '/images/test-avatar.jpg',
    size: 'md',
    hasBadge: false
}

const setup = (props?: Partial<AvatarProps>) => {
    render(<Avatar {...defaultProps} {...props} />)
}

describe('Avatar component', () => {
    it('renders fallback when no image is provided', () => {
        setup({ fallBack: 'AB' })
        expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('renders with image', () => {
        setup({ src: '/avatar.jpg' })
        waitFor(() => {
            const image = screen.getByRole('img')

            expect(image).toHaveAttribute(
                'src',
                '/images/test-avatar.jpg'
            )
        })
    })

    it('renders badge when hasBadge is true', () => {
        setup({ hasBadge: true })
        expect(screen.getByRole('presentation')).toBeInTheDocument()
    })

    it.each(['xs', 'sm', 'md', 'lg'] as const)(
        'applies correct size class for size "%s"',
        async (size) => {
            setup({ src: '/avatar.jpg', size, hasBadge: true })

            waitFor(async () => {
                const img = screen.getByRole('img')

                expect(img).toHaveClass(`nt-avatar-${size}`)

                const wrapper = img.parentElement
                expect(wrapper).toHaveClass(
                    `nt-avatar-wrapper-${size}`
                )
            })
        }
    )

    it.each(['online', 'offline', 'away', 'busy'] as const)(
        'applies correct status class for status "%s"',
        (status) => {
            setup({ hasBadge: true, status })
            const badge = screen.getByRole('presentation')

            expect(badge).toHaveClass(`nt-avatar-status-${status}`)
        }
    )

    it.each(['sm', 'md', 'lg', 'full'] as const)(
        'applies correct radius class for radius "%s"',
        async (radius) => {
            setup({ src: '/avatar.jpg', radius })

            waitFor(async () => {
                const img = screen.getByRole('img')

                expect(img).toHaveClass(`nt-avatar-radius-${radius}`)
            })
        }
    )

    it('applies custom className and badgeClass', () => {
        setup({
            className: 'custom-wrapper',
            badgeClass: 'custom-badge',
            hasBadge: true
        })

        waitFor(() => {
            const wrapper = screen.getByRole('img').parentElement
            expect(wrapper).toHaveClass('custom-wrapper')

            const badge = screen.getByRole('presentation')
            expect(badge).toHaveClass('custom-badge')
        })
    })
})
