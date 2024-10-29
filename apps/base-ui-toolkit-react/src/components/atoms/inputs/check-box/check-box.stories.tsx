import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '.'

const meta: Meta<typeof CheckBox> = {
    component: CheckBox,
    tags: ['autodocs'],
    title: 'Components/Data Entry/CheckBox',
}

export default meta
type Story = StoryObj<typeof CheckBox>

export const Default: Story = {
    args: {
        label: 'Label',
    },
}

export const Disable: Story = {
    args: {
        label: 'Label',
        disabled: true,
    },
}
