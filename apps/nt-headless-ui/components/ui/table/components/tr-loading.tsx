import type { Table } from '@tanstack/react-table'

import TdSkeleton from './td-skeleton'

type TrLoadingProps = {
    table: Table<unknown>
}

const TrLoading = (props: TrLoadingProps) => {
    const { table } = props
    return (
        <tr className="hover:bg-gray-100 !border-none">
            {table.getHeaderGroups().length > 0 &&
                table.getHeaderGroups()[0].headers.map((header) => (
                    <td
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-6 py-4 whitespace-nowrap"
                    >
                        <div className="flex items-center w-full">
                            <div className="text-sm text-gray-900 w-full">
                                <TdSkeleton />
                            </div>
                        </div>
                    </td>
                ))}
        </tr>
    )
}

export default TrLoading
