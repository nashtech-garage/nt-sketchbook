import { createColumnHelper } from '@tanstack/react-table'
import { Copy, Edit } from 'lucide-react'

import { Avatar } from '../../avatar/avatar'
import { Badge } from '../../badge/badge'
import { Button } from '../../button/button'

const columnHelper = createColumnHelper()
const audiences = ['Men', 'Women', 'Teens', 'Seniors', 'Young Adults']
const statuses = ['active', 'pending', 'in progress']
const reportNames = [
    'Linsley',
    'Anderson',
    'Williams',
    'Johnson',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
]

export const userData = Array.from({ length: 50 }, (_, i) => ({
    id: `C${30 + i}`,
    reportName: reportNames[i % reportNames.length],
    audience: audiences[i % audiences.length],
    creationDate: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
    ).toLocaleDateString('en-GB'),
    status: statuses[i % statuses.length],
}))

export const columns = [
    columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => 'ID',
        enableSorting: false,
    }),
    columnHelper.accessor('reportName', {
        header: () => 'Report name',
        cell: (info) => {
            return <strong>{info.getValue()}</strong>
        },
    }),
    columnHelper.accessor('audience', {
        header: () => 'Audience',
        cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor('creationDate', {
        header: () => 'Creation Date',
        enableSorting: false,
    }),
    columnHelper.accessor('by', {
        header: 'By',
        cell: () => {
            const URL_IMAGE = './assets/images/image.png'
            return (
                <Avatar
                    src={URL_IMAGE}
                    className="h-[25px] w-[25px]"
                />
            )
        },
        enableSorting: false,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
            <Badge
                className={`!text-xs ${
                    (info.getValue() as string).toLowerCase() ===
                    'active'
                        ? 'bg-success text-white'
                        : 'bg-danger text-white'
                }`}
            >
                {info.getValue()}
            </Badge>
        ),
        enableSorting: false,
    }),
    columnHelper.accessor('actions', {
        header: '',
        cell: () => (
            <div className="flex items-center space-x-2">
                <Button size="extraSmall" variant="ghost">
                    <Edit size={12} />
                </Button>
                <Button size="extraSmall" variant="ghost">
                    <Copy size={12} />
                </Button>
            </div>
        ),
        enableSorting: false,
    }),
]
