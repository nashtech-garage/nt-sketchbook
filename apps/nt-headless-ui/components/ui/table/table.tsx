import { cn } from '@/lib/utils'
import type {
    ColumnDef,
    Table as ReactTable
} from '@tanstack/react-table'

import { PaginationTable, Th, Tr, TrLoading } from './components'
import { useTable } from './hooks/use-table'

export type TableProps = {
    data: unknown[]
    columns: ColumnDef<unknown>[]
    classPagination?: string
    searchable?: boolean
    isLoading?: boolean
    textItemsPerPage?: string
    itemPerPage?: number
    onPageClick?: (page: number) => void
    onItemPerPageChange?: (itemPerPage: number) => void
    bordered?: boolean
    striped?: boolean
    hover?: boolean
    align?: 'left' | 'center' | 'right'
}

export const Table = (props: TableProps) => {
    const {
        isLoading = false,
        classPagination = '',
        textItemsPerPage = 'Items on page',
        itemPerPage = 10,
        onItemPerPageChange = null,
        bordered = false,
        striped = true,
        hover = false,
        align = 'center',
        ...useTableProps
    } = props

    const { endIndex, startIndex, table, handlePageClick } =
        useTable(useTableProps)

    return (
        <>
            <table
                className={cn(
                    'nt-table',
                    bordered
                        ? 'nt-table-bordered'
                        : 'nt-table-no-bordered',
                    striped && 'nt-table-striped',
                    hover && 'nt-table-hover',
                    align && `nt-table-${align}`
                )}
            >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Th
                            key={headerGroup.id}
                            headerGroup={headerGroup}
                        />
                    ))}
                </thead>
                <tbody>
                    {isLoading &&
                        [...Array(5)].map((_, i) => (
                            <TrLoading key={i} table={table} />
                        ))}
                    {!isLoading &&
                        table
                            .getRowModel()
                            .rows.map((row) => (
                                <Tr key={row.id} row={row} />
                            ))}
                </tbody>
            </table>

            {!isLoading && table.getPageCount() > 0 && (
                <PaginationTable
                    table={
                        table as ReactTable<Record<string, unknown>>
                    }
                    startIndex={startIndex}
                    endIndex={endIndex}
                    handlePageClick={handlePageClick}
                    handleItemPerPageChange={onItemPerPageChange!}
                    classPagination={classPagination}
                    textItemsPerPage={textItemsPerPage}
                    itemPerPage={itemPerPage}
                />
            )}
        </>
    )
}
