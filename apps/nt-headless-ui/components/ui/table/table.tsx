import { cn } from '@headless-ui/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

import { Pagination, Th, Tr, TrLoading } from './components'
import { useTable } from './hooks/use-table'
import './table.scss'

export type TableProps = {
    data: unknown[]
    columns: ColumnDef<unknown>[]
    classNameContainer?: string
    classFontSize?: string
    classFontSizeBody?: string
    classPagination?: string
    classPaginationFontSize?: string
    classTh?: string
    searchable?: boolean
    isLoading?: boolean
    textItemsPerPage?: string
    itemPerPage?: number
    onPageClick?: (page: number) => void
    onItemPerPageChange?: (itemPerPage: number) => void
}

export const Table = (props: TableProps) => {
    const {
        classNameContainer = '',
        isLoading = false,
        classPagination = '',
        classTh = '',
        classFontSize = '!text-xs',
        classFontSizeBody = '!text-sm',
        textItemsPerPage = 'Items on page',
        itemPerPage = 10,
        onItemPerPageChange = null,
        ...useTableProps
    } = props

    const { endIndex, startIndex, table, handlePageClick } =
        useTable(useTableProps)

    return (
        <div className={cn('flex flex-col ', classNameContainer)}>
            <div className="mt-6">
                <div className="align-middle inline-block w-full ">
                    <div className="w-full ">
                        <table className="w-full table-nt">
                            <thead className="bg-white p-3 table-nt__thead">
                                {table
                                    .getHeaderGroups()
                                    .map((headerGroup) => (
                                        <Th
                                            key={headerGroup.id}
                                            headerGroup={headerGroup}
                                            classTh={classTh}
                                            classFontSize={
                                                classFontSize
                                            }
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
                                                classFontSizeBody={
                                                    classFontSizeBody
                                                }
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
                                handleItemPerPageChange={
                                    onItemPerPageChange!
                                }
                                classPagination={classPagination}
                                classFontSize={classFontSize}
                                textItemsPerPage={textItemsPerPage}
                                itemPerPage={itemPerPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
