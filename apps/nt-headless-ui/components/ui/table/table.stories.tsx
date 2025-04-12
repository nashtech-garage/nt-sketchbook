import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { columns, userData } from './mock/data'
import type { TableProps } from './table'
import { Table } from './table'

export default {
    title: 'Components/Table',
    component: Table,
} as Meta

const Template: StoryFn<TableProps> = (args: TableProps) => (
    <Table {...args} />
)

export const Default = Template.bind({})
Default.args = {
    columns: columns as Array<{
        header: string
        accessorKey: string
    }>,
    data: userData,
}

export const Empty = Template.bind({})
Empty.args = {
    columns: [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Age', accessorKey: 'age' },
        { header: 'Email', accessorKey: 'email' },
    ],
    data: [],
}
