import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarSize } from './avatar'

describe('Avatar', () => {
    it('renders fallback content when image source is not provided', () => {
        render(<Avatar fallBack="NA" />)
        const fallback = screen.getByText('NA')

        expect(fallback).toBeInTheDocument()
    })

    it('renders an image when a valid src is provided', () => {
        render(<Avatar src="/images/test-avatar.jpg" />)

        waitFor(() => {
            const image = screen.getByRole('img')
            expect(image).toHaveAttribute(
                'src',
                '/images/test-avatar.jpg',
            )
        })
    })

    it('renders a badge when hasBadge is true', () => {
        render(<Avatar src="/images/test-avatar.jpg" hasBadge />)
        const badge = screen.getByRole('presentation')

        expect(badge).toBeInTheDocument()
        expect(badge).toHaveClass('bg-primary')
    })

    it('positions the badge correctly based on badgePosition prop', () => {
        render(
            <Avatar
                src="/images/test-avatar.jpg"
                hasBadge
                badgePosition="bottom-left"
            />,
        )
        const badge = screen.getByRole('presentation')

        expect(badge).toHaveClass('absolute bottom-[3px] left-[1px]')
    })

    it('does not render a badge when hasBadge is false', () => {
        render(
            <Avatar src="/images/test-avatar.jpg" hasBadge={false} />,
        )
        const badge = screen.queryByRole('presentation')

        expect(badge).not.toBeInTheDocument()
    })

    it.each([
        { size: 'extra-small', expectedClass: 'h-7 w-7' },
        { size: 'small', expectedClass: 'h-10 w-10' },
        { size: 'medium', expectedClass: 'h-20 w-20' },
        { size: 'large', expectedClass: 'h-40 w-40' },
    ])(
        'applies the correct size class for %s avatars',
        ({ size, expectedClass }) => {
            const { container } = render(
                <Avatar size={size as AvatarSize} />,
            )
            const avatarElement = container.firstChild

            expect(avatarElement).toHaveClass(expectedClass)
        },
    )
})
