import type { Meta, StoryObj } from '@storybook/react'

import { InputRange } from '.'

const meta: Meta<typeof InputRange> = {
    component: InputRange,
    tags: ['autodocs'],
    title: 'Components/Data Entry/Range',
}

export default meta
type Story = StoryObj<typeof InputRange>

export const Default: Story = {
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg'],
            control: 'select',
        },
        color: {
            options: [
                'primary',
                'secondary',
                'success',
                'danger',
                'warning',
                'info',
            ],
            control: 'select',
        },
    },
}

export const DisableInput: Story = {
    args: {
        disabled: true,
        value: 30,
    },
}
