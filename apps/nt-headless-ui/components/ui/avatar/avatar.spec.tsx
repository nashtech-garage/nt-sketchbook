import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from './avatar'

describe('Avatar', () => {
    it('renders with image source and fallback', () => {
        render(<Avatar src="/images/test-avatar.jpg" fallBack="JD" />)
        const image = screen.getByRole('img')
        const fallback = screen.queryByText('JD')

        expect(image).toHaveAttribute(
            'src',
            '/images/test-avatar.jpg',
        )
        expect(fallback).not.toBeInTheDocument()
    })

    it('renders fallback content when image source is not provided', () => {
        render(<Avatar fallBack="NA" />)
        const fallback = screen.getByText('NA')

        expect(fallback).toBeInTheDocument()
    })

    it('renders a badge with the correct content', () => {
        render(<Avatar src="/images/test-avatar.jpg" badge="!" />)
        const badge = screen.getByText('!')

        expect(badge).toBeInTheDocument()
    })

    it('positions the badge correctly based on badgePosition prop', () => {
        render(
            <Avatar
                src="/images/test-avatar.jpg"
                badge="NEW"
                badgePosition="bottom-left"
            />,
        )
        const badge = screen.getByText('NEW')

        expect(badge).toHaveClass('absolute bottom-[3px] left-[1px]')
    })

    it('does not render a badge when the badge prop is not provided', () => {
        render(<Avatar src="/images/test-avatar.jpg" />)
        const badge = screen.queryByText('NEW')

        expect(badge).not.toBeInTheDocument()
    })
})
