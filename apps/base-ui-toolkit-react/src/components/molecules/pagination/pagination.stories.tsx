import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta: Meta<typeof Pagination> = {
    component: Pagination,
    tags: ['autodocs'],
    title: 'Components/General/Pagination',
    args: {
        total: 100,
    },
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {}
