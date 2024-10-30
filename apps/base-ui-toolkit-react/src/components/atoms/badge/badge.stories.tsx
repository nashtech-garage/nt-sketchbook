import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from '.'

const meta: Meta<typeof Badge> = {
    component: Badge,
    title: 'Components/General/Badge',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['blue', 'red', 'green', 'yellow'],
            control: 'select',
        },
    },
}

export default meta
type Story = StoryObj<typeof Badge>

export const DefaultBadge: Story = {
    args: {
        label: 'Badge',
        variant: 'blue',
    },
}
