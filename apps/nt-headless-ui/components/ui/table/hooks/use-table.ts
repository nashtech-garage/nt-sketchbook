import {
    ColumnDef,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react'

type UseTableProps = {
    data: unknown[]
    columns: ColumnDef<unknown>[]
}

export const useTable = (props: UseTableProps) => {
    const { data = [], columns = [] } = props

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })

    const { pageIndex } = table.getState().pagination
    const { pageSize } = table.getState().pagination
    const rowsPerPage = table.getRowModel().rows.length

    const startIndex = React.useMemo(
        () => pageIndex * pageSize,
        [pageIndex, pageSize],
    )

    const endIndex = React.useMemo(
        () => startIndex + (rowsPerPage ?? 0),
        [startIndex, rowsPerPage],
    )

    const handlePageClick = (page: number) => {
        table.setPageIndex(page - 1)
    }

    return {
        table,
        startIndex,
        endIndex,
        handlePageClick,
    }
}
