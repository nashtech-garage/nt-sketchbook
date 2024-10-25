import type { Meta, StoryObj } from '@storybook/react'

import { InlineEdit } from '.'

const meta: Meta<typeof InlineEdit> = {
  component: InlineEdit,
  tags: ['autodocs'],
  title: 'Components/Data entry/Inline edit',
  args: {},
}

export default meta

type Story = StoryObj<typeof InlineEdit>

export const Default: Story = {
  args: {},
}
