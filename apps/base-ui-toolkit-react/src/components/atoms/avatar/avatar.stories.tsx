import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '.'

const meta: Meta<typeof Avatar> = {
    component: Avatar,
    tags: ['autodocs'],
    title: 'Components/General/Avatar',
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg'],
            control: 'select',
        },
        isBordered: {
            type: 'boolean',
        },
    },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
    args: {
        src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
}
