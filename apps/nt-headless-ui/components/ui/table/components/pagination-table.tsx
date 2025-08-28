import { cn } from '@/lib/utils'
import type { Table } from '@tanstack/react-table'

import { Pagination } from '../../pagination/pagination'
import { Select } from '../../select/select'

export type PaginationProps = {
    startIndex: number
    endIndex: number
    classPagination?: string
    textItemsPerPage?: string
    table: Table<Record<string, unknown>>
    handlePageClick: (page: number) => void
    itemPerPage?: number
    handleItemPerPageChange?: (itemPerPage: number) => void
}

const PaginationTable = (props: PaginationProps) => {
    const {
        handlePageClick,
        handleItemPerPageChange = null,
        table,
        classPagination = '',
        textItemsPerPage = '',
        itemPerPage
    } = props

    const currentPage = table.getState().pagination.pageIndex + 1
    const datPagesSize = Array.from({ length: table.getRowCount() })

    const possiblePageSizes = Array.from(
        { length: Math.ceil(datPagesSize.length / itemPerPage!) },
        (_, i) => (i + 1) * 10
    )

    return (
        <div
            className={cn(
                'nt-d-flex nt-items-center nt-justify-between',
                classPagination
            )}
        >
            <div className="nt-d-flex nt-items-center nt-gap-3 ">
                <Select
                    options={possiblePageSizes.map((size) => ({
                        label: String(size),
                        value: String(size)
                    }))}
                    value={String(
                        table.getState().pagination.pageSize
                    )}
                    onChange={(value) => {
                        if (handleItemPerPageChange) {
                            handleItemPerPageChange(Number(value))
                        } else {
                            table.setPageSize(Number(value))
                        }
                    }}
                />
                <span>{textItemsPerPage}</span>
            </div>
            {(table.getCanPreviousPage() ||
                table.getCanNextPage()) && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={table.getPageCount()}
                    onPageChange={handlePageClick}
                />
            )}
        </div>
    )
}

export default PaginationTable
