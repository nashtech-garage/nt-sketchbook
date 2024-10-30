import type { Meta, StoryObj } from '@storybook/react'

import { InputNumber } from '.'

const meta: Meta<typeof InputNumber> = {
    component: InputNumber,
    tags: ['autodocs'],
    title: 'Components/Data Entry/Number',
}

export default meta
type Story = StoryObj<typeof InputNumber>

export const Default: Story = {
    args: undefined,
}

export const DisableInput: Story = {
    args: {
        disabled: true,
        value: 9999,
    },
}
