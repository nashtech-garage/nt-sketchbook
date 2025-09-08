import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Pagination, type PaginationProps } from './pagination'

const meta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    args: {
        totalPages: 5,
        currentPage: 1,
        showArrows: true
    },
    argTypes: {
        onPageChange: { action: 'page changed' }
    }
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
    render: (args: PaginationProps) => {
        const [page, setPage] = useState(args.currentPage)

        return (
            <Pagination
                {...args}
                currentPage={page}
                onPageChange={(p) => {
                    setPage(p)
                    args.onPageChange?.(p)
                }}
            />
        )
    }
}

export const WithoutArrows: Story = {
    args: {
        showArrows: false
    },
    render: Default.render
}

export const ManyPages: Story = {
    args: {
        totalPages: 10,
        currentPage: 5
    },
    render: Default.render
}
