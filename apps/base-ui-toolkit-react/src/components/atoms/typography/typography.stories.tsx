import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '.'

const meta: Meta<typeof Typography> = {
    component: Typography,
    tags: ['autodocs'],
    title: 'Components/General/Typography',
    argTypes: {
        variant: {
            options: ['secondary', 'success', 'warning', 'danger'],
            control: 'select',
        },
        level: {
            options: [1, 2, 3, 4, 5],
            control: 'select',
        },
    },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Level1: Story = {
    args: {
        children: 'level 1',
        level: 1,
        variant: 'success',
    },
}

export const Level2: Story = {
    args: {
        children: 'level 2',
        level: 2,
    },
}

export const Level3: Story = {
    args: {
        children: 'level 3',
        level: 3,
    },
}

export const Level4: Story = {
    args: {
        children: 'level 4',
        level: 4,
    },
}

export const Level5: Story = {
    args: {
        children: 'level 5',
        level: 5,
    },
}
