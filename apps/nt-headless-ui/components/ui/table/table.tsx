import { cn } from '@headless-ui/lib/utils'

import { Pagination, Th, Tr, TrLoading } from './components'
import { useTable } from './hooks/use-table'
import './table.scss'

export { createColumnHelper } from '@tanstack/react-table'

export type TableProps = {
    classNameContainer?: string
    searchable?: boolean
    isLoading?: boolean
    title?: string
    data: any[] // eslint-disable-line
    columns: any[] // eslint-disable-line
}

export const Table = (props: TableProps) => {
    const {
        classNameContainer = '',
        isLoading = false,
        title = '',
        ...useTableProps
    } = props

    const { endIndex, startIndex, table, handlePageClick } =
        useTable(useTableProps)

    return (
        <div
            className={cn(
                'flex flex-col border p-5 rounded',
                classNameContainer,
            )}
        >
            <div className="mt-6">
                <div className="align-middle inline-block w-full ">
                    <div
                        className={cn(
                            'bg-white px-6 py-4 whitespace-nowrap flex',
                            {
                                'justify-between': title,
                                'justify-end': !title,
                            },
                        )}
                    >
                        {title && (
                            <div>
                                <h3 className="text-sm font-bold">
                                    {title}
                                </h3>
                            </div>
                        )}
                    </div>
                    <div className="w-full ">
                        <table className="w-full table-nt">
                            <thead className="bg-white p-3 table-nt__thead">
                                {table
                                    .getHeaderGroups()
                                    .map((headerGroup) => (
                                        <Th
                                            key={headerGroup.id}
                                            headerGroup={headerGroup}
                                        />
                                    ))}
                            </thead>
                            <tbody className="bg-white table-nt__tbody">
                                {isLoading &&
                                    [...Array(5)].map((_, i) => (
                                        <TrLoading
                                            key={i}
                                            table={table}
                                        />
                                    ))}
                                {!isLoading &&
                                    table
                                        .getRowModel()
                                        .rows.map((row) => (
                                            <Tr
                                                key={row.id}
                                                row={row}
                                            />
                                        ))}
                            </tbody>
                        </table>

                        {!isLoading && table.getPageCount() > 0 && (
                            <Pagination
                                table={table}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                handlePageClick={handlePageClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
