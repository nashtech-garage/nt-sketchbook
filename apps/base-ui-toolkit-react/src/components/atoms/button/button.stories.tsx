import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/General/Button',
  args: {
    theme: 'default',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: ['primary', 'default'],
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const DefaultButton: Story = {
  args: {
    label: 'Button',
  },
}

export const DisabledButton: Story = {
  args: {
    label: 'Button',
    isDisabled: true,
  },
}
