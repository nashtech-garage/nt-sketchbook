import type { Table } from '@tanstack/react-table'

import TdSkeleton from './td-skeleton'

type TrLoadingProps = {
    table: Table<unknown>
}

const TrLoading = (props: TrLoadingProps) => {
    const { table } = props
    return (
        <tr>
            {table.getHeaderGroups().length > 0 &&
                table.getHeaderGroups()[0].headers.map((header) => (
                    <td key={header.id} colSpan={header.colSpan}>
                        <TdSkeleton />
                    </td>
                ))}
        </tr>
    )
}

export default TrLoading
