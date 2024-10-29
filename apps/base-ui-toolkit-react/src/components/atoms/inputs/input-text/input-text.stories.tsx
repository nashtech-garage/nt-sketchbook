import type { Meta, StoryObj } from '@storybook/react'

import { InputText } from '.'

const meta: Meta<typeof InputText> = {
    component: InputText,
    tags: ['autodocs'],
    title: 'Components/Data Entry/Text',
}

export default meta
type Story = StoryObj<typeof InputText>

export const Default: Story = {
    args: undefined,
}

export const DisableInput: Story = {
    args: {
        disabled: true,
        value: 'nonone@hot.com',
    },
}
