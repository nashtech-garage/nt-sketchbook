import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/General/Card',
}

export default meta
type Story = StoryObj<typeof Card>

export const DefaultCard: Story = {
  args: {
    title: 'Card title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula odio sit amet urna luctus, nec sollicitudin libero malesuada. Vestibulum eu efficitur ante. Nullam nec posuere justo, ac bibendum dolor. Praesent quis augue ac libero accumsan feugiat vel ac lorem.',
    imgLink:
      'https://cf.shopee.vn/file/ec95aefad776faaf74e389ef10ecc2bc',
  },
}
