import type { Meta, StoryObj } from '@storybook/react'

import AvatarGroup from './avatar-group'

const meta: Meta<typeof AvatarGroup> = {
    title: 'Components/Avatar/AvatarGroup',
    component: AvatarGroup,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg']
        },
        count: {
            control: { type: 'number', min: 0 }
        }
    }
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

const sampleAvatars = [
    { src: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { src: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { src: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { src: 'https://randomuser.me/api/portraits/men/4.jpg' }
]

export const Default: Story = {
    args: {
        avatars: sampleAvatars,
        count: 5,
        size: 'md'
    }
}

export const ExtraSmall: Story = {
    args: {
        avatars: sampleAvatars,
        count: 5,
        size: 'xs'
    }
}

export const Medium: Story = {
    args: {
        avatars: sampleAvatars,
        count: 3,
        size: 'md'
    }
}

export const LargeWithStatus: Story = {
    args: {
        avatars: [
            {
                src: 'https://randomuser.me/api/portraits/women/1.jpg',
                status: 'away',
                hasBadge: true
            },
            {
                src: 'https://randomuser.me/api/portraits/women/2.jpg',
                status: 'busy',
                hasBadge: true
            },
            {
                src: 'https://randomuser.me/api/portraits/men/3.jpg',
                status: 'online',
                hasBadge: true
            },
            {
                src: 'https://randomuser.me/api/portraits/men/4.jpg',
                status: 'offline',
                hasBadge: true
            }
        ],
        count: 5,
        size: 'lg'
    }
}
