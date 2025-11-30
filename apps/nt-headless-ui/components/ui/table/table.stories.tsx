import type { Meta, StoryFn } from '@storybook/nextjs-vite'

import { columns, userData } from './mock/data'
import type { TableProps } from './table'
import { Table } from './table'

export default {
    title: 'Components/Table',
    component: Table,
    argTypes: {
        bordered: {
            control: { type: 'boolean' },
            description: 'Add borders to the table cells',
            defaultValue: false
        },
        striped: {
            control: { type: 'boolean' },
            description: 'Add zebra striping to the table rows',
            defaultValue: true
        },
        hover: {
            control: { type: 'boolean' },
            description: 'Add hover effect to the table rows',
            defaultValue: false
        },
        align: {
            control: { type: 'select' },
            options: ['left', 'center', 'right'],
            description: 'Align text in table cells',
            defaultValue: 'center'
        }
    }
} as Meta

const Template: StoryFn<TableProps> = (args: TableProps) => (
    <Table {...args} />
)

export const Default: StoryFn<TableProps> = Template.bind(
    {}
) as StoryFn<TableProps>
Default.args = {
    columns: columns as Array<{
        header: string
        accessorKey: string
    }>,
    data: userData
}

export const Empty: StoryFn<TableProps> = Template.bind(
    {}
) as StoryFn<TableProps>
Empty.args = {
    columns: [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Age', accessorKey: 'age' },
        { header: 'Email', accessorKey: 'email' }
    ],
    data: []
}
