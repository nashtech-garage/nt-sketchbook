import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from '.'

const meta: Meta<typeof ProgressBar> = {
    component: ProgressBar,
    tags: ['ProgressBar'],
    title: 'Components/General/Progress bar',
    argTypes: {
        isIndeterminate: {
            control: 'boolean',
        },
    },
    args: {
        value: 30,
    },
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {}

export const Indeterminate: Story = {
    args: {
        isIndeterminate: true,
    },
}
