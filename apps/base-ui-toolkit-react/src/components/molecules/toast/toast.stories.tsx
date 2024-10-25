import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from '.'

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['autodocs'],
  title: 'Components/Feedback/Toast',
  argTypes: {
    type: {
      options: ['success', 'fail', 'warning'],
      control: 'select',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const DefaultToast: Story = {
  args: {
    title: 'Save success',
    isOpen: true,
    content: 'Your content save successfully',
  },
}
