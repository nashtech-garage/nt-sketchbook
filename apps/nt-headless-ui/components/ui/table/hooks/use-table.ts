import type { ColumnDef } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useMemo } from 'react'

type UseTableProps = {
    data: unknown[]
    columns: ColumnDef<unknown>[]
    onPageClick?: (page: number) => void
}

export const useTable = (props: UseTableProps) => {
    const { data = [], columns = [], onPageClick = null } = props

    const table = useReactTable({
        data,
        columns,
        rowCount: data.length,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const { pageIndex } = table.getState().pagination
    const { pageSize } = table.getState().pagination
    const rowsPerPage = table.getRowModel().rows.length

    const startIndex = useMemo(
        () => pageIndex * pageSize,
        [pageIndex, pageSize]
    )

    const endIndex = useMemo(
        () => startIndex + (rowsPerPage ?? 0),
        [startIndex, rowsPerPage]
    )

    const handlePageClick = (page: number) => {
        console.log('page', page)
        if (onPageClick) {
            onPageClick(page)
        } else {
            table.setPageIndex(page - 1)
        }
    }

    return {
        table,
        startIndex,
        endIndex,
        handlePageClick
    }
}
