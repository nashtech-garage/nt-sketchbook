import type { Meta, StoryObj } from '@storybook/react'

import { Toggle } from '.'

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    tags: ['autodocs'],
    title: 'Components/Data Entry/Toggle',
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
    args: undefined,
}
