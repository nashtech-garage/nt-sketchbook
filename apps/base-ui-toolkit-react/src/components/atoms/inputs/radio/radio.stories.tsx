import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '.'

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/Data Entry/Radio',
}

export default meta
type Story = StoryObj<typeof Radio>

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
