import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { AvatarSize, BadgePosition } from './avatar'
import { Avatar } from './avatar'

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

    it('does not render a badge when hasBadge is false', () => {
        render(
            <Avatar src="/images/test-avatar.jpg" hasBadge={false} />,
        )
        const badge = screen.queryByRole('presentation')

        expect(badge).not.toBeInTheDocument()
    })

    it.each([
        {
            position: 'top-left',
            size: 'extra-small',
            expectedClass: 'absolute top-[5px] left-[-3px]',
        },
        {
            position: 'top-right',
            size: 'extra-small',
            expectedClass: 'absolute top-[5px] right-[-3px]',
        },
        {
            position: 'bottom-left',
            size: 'extra-small',
            expectedClass: 'absolute bottom-[5px] left-[-3px]',
        },
        {
            position: 'bottom-right',
            size: 'extra-small',
            expectedClass: 'absolute bottom-[5px] right-[-3px]',
        },

        {
            position: 'top-left',
            size: 'small',
            expectedClass: 'absolute top-[5px] left-[-4px]',
        },
        {
            position: 'top-right',
            size: 'small',
            expectedClass: 'absolute top-[5px] right-[-4px]',
        },
        {
            position: 'bottom-left',
            size: 'small',
            expectedClass: 'absolute bottom-[5px] left-[-4px]',
        },
        {
            position: 'bottom-right',
            size: 'small',
            expectedClass: 'absolute bottom-[5px] right-[-4px]',
        },

        {
            position: 'top-left',
            size: 'medium',
            expectedClass: 'absolute top-[10px] left-0',
        },
        {
            position: 'top-right',
            size: 'medium',
            expectedClass: 'absolute top-[10px] right-0',
        },
        {
            position: 'bottom-left',
            size: 'medium',
            expectedClass: 'absolute bottom-[10px] left-0',
        },
        {
            position: 'bottom-right',
            size: 'medium',
            expectedClass: 'absolute bottom-[10px] right-0',
        },

        {
            position: 'top-left',
            size: 'large',
            expectedClass: 'absolute top-[10px] left-[18px]',
        },
        {
            position: 'top-right',
            size: 'large',
            expectedClass: 'absolute top-[10px] right-[18px]',
        },
        {
            position: 'bottom-left',
            size: 'large',
            expectedClass: 'absolute bottom-[10px] left-[18px]',
        },
        {
            position: 'bottom-right',
            size: 'large',
            expectedClass: 'absolute bottom-[10px] right-[18px]',
        },
    ])(
        'positions the badge correctly for $position at size $size',
        ({ position, size, expectedClass }) => {
            render(
                <Avatar
                    src="/images/test-avatar.jpg"
                    hasBadge
                    badgePosition={position as BadgePosition}
                    size={size as AvatarSize}
                />,
            )
            const badge = screen.getByRole('presentation')
            expect(badge).toHaveClass(expectedClass)
        },
    )

    it.each([
        { size: 'extra-small', expectedClass: 'h-7 w-7' },
        { size: 'small', expectedClass: 'h-10 w-10' },
        { size: 'medium', expectedClass: 'h-20 w-20' },
        { size: 'large', expectedClass: 'h-40 w-40' },
    ])(
        'applies the correct size class for $size avatars',
        ({ size, expectedClass }) => {
            const { container } = render(
                <Avatar size={size as AvatarSize} />,
            )
            const avatarElement = container.firstChild

            expect(avatarElement).toHaveClass(expectedClass)
        },
    )
})
