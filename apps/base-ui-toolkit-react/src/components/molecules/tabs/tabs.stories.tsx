import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '.'

export const tabItems = [
  {
    key: 1,
    label: 'Profile',
    children: 'Profile',
  },
  {
    key: 2,
    label: 'Dashboard',
    children: 'Dashboard',
  },
  {
    key: 3,
    label: 'Setting',
    children: 'Setting',
  },
  {
    key: 4,
    label: 'Local',
    children: 'Local',
    disabled: true,
  },
]

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Data Entry/Tabs',
  args: {
    items: tabItems,
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    items: tabItems,
  },
}

export const Vertical: Story = {
  args: {
    items: tabItems,
    position: 'vertical',
  },
}
