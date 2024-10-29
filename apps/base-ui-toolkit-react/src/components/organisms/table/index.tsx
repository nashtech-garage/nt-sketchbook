import {
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import { combineClasses } from '@/utils/tailwind'

import { Pagination, Search, Th, Tr, TrLoading } from './components'

export { createColumnHelper } from '@tanstack/react-table'

type TableProps = {
    classNameContainer?: string
    searchable?: boolean
    isLoading?: boolean
    title?: string
    data: any[] // eslint-disable-line
    columns: any[] // eslint-disable-line
}

const Table = (props: TableProps) => {
    const {
        classNameContainer = '',
        searchable = false,
        isLoading = false,
        title = '',
        data = [],
        columns = [],
    } = props

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

    const startIndex = useMemo(
        () => pageIndex * pageSize,
        [pageIndex, pageSize],
    )

    const endIndex = useMemo(
        () => startIndex + (rowsPerPage ?? 0),
        [startIndex, rowsPerPage],
    )

    return (
        <div
            className={combineClasses(
                'flex flex-col',
                classNameContainer,
            )}
        >
            <div className={`${!searchable && 'mt-6'}`}>
                <div className="align-middle inline-block w-full sm:px-6 lg:px-8">
                    {searchable && <Search isLoading={isLoading} />}
                    <div
                        className={combineClasses(
                            'bg-white border-[#D4D4D8] border px-6 py-4 whitespace-nowrap flex',
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
                    <div className="w-full border border-[#D4D4D8] border-t-0">
                        <table className="w-full divide-y divide-[#D4D4D8]">
                            <thead className="bg-white divide-y divide-[#D2E1EF] border-t-0">
                                {table
                                    .getHeaderGroups()
                                    .map((headerGroup) => (
                                        <Th
                                            key={headerGroup.id}
                                            headerGroup={headerGroup}
                                        />
                                    ))}
                            </thead>
                            <tbody className="bg-white divide-y divide-[#D2E1EF]">
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
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Table }

export default Table
