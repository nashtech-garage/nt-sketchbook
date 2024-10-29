import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '.'

const meta: Meta<typeof TextArea> = {
    component: TextArea,
    tags: ['autodocs'],
    title: 'Components/Data Entry/TextArea',
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
    args: undefined,
}

export const DisableInput: Story = {
    args: {
        isDisabled: true,
        value: 'nonone@hot.com',
    },
}
