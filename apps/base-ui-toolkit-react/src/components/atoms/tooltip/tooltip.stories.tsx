import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from '.'

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
    tags: ['autodocs'],
    title: 'Components/General/Tooltip',
    argTypes: {
        position: {
            options: ['top', 'right', 'left', 'bottom'],
            control: 'select',
        },
    },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
    args: {
        children: <span>hover me</span>,
        message: 'Hover me',
    },
}
