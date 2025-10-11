import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvatarGroup, { type AvatarGroupProps } from './avatar-group'

const mockAvatars: AvatarGroupProps['avatars'] = [
    {
        src: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
        src: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
]

const defaultProps: AvatarGroupProps = {
    avatars: mockAvatars,
    size: 'md',
    count: 0,
    className: ''
}

const setup = (props?: Partial<AvatarGroupProps>) => {
    return render(<AvatarGroup {...defaultProps} {...props} />)
}

describe('AvatarGroup', () => {
    it('renders all avatars', () => {
        setup()

        waitFor(() => {
            const images = screen.getAllByRole('img')
            images.forEach((img, index) => {
                expect(img).toBeInTheDocument()
                expect(img).toHaveAttribute(
                    'src',
                    mockAvatars[index].src
                )
            })
            expect(images).toHaveLength(mockAvatars.length)
        })
    })

    it('applies correct size classes', () => {
        setup({ size: 'lg' })

        waitFor(() => {
            const avatars = screen.getAllByRole('img')
            avatars.forEach((img) => {
                expect(img).toHaveClass('nt-avatar-lg')
            })
        })
    })

    it('renders count avatar when count > 0', () => {
        setup({ count: 5 })

        const countElement = screen.getByText('5+')
        expect(countElement).toBeInTheDocument()
        expect(countElement).toHaveClass('nt-avatar-count')
    })

    it('does not render count avatar when count is 0', () => {
        setup({ count: 0 })

        const countElement = screen.queryByText(/^\d+\+$/)
        expect(countElement).not.toBeInTheDocument()
    })

    it('merges custom className', () => {
        setup({ className: 'custom-class' })

        const group = document.querySelector('.nt-avatar-group')
        expect(group).toHaveClass('custom-class')
    })
})
