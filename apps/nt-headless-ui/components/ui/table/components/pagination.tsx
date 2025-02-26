import { cn } from '@headless-ui/lib/utils'
import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Select } from '../../select/select'

type PaginationProps = {
    startIndex: number
    endIndex: number
    classPagination?: string
    classFontSize?: string
    table: Table<any> //eslint-disable-line
    handlePageClick: (page: number) => void
}

const Pagination = (props: PaginationProps) => {
    const {
        handlePageClick,
        table,
        classPagination = '',
        classFontSize = '',
    } = props

    const currentPage = table.getState().pagination.pageIndex + 1

    return (
        <div
            className={cn(
                'flex items-center justify-between ',
                classPagination,
            )}
        >
            <div className="flex items-center gap-3 w-[200px]">
                <Select
                    options={[
                        { label: '10', value: '10' },
                        { label: '20', value: '20' },
                    ]}
                    value="10"
                    className="w-[55px] pagination-select"
                    classOption={classFontSize}
                />
                <span className={classFontSize}>Items on page</span>
            </div>
            {(table.getCanPreviousPage() ||
                table.getCanNextPage()) && (
                <div className="items-center gap-2 flex">
                    <button
                        className={` ${
                            table.getCanPreviousPage()
                                ? 'text-black'
                                : 'text-[#9CA3AF] cursor-not-allowed'
                        } `}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={14} />
                    </button>
                    {Array.from(
                        { length: table.getPageCount() },
                        (_, i) => i + 1,
                    ).map((page) => (
                        <button
                            key={page}
                            className={`px-2 py-1 rounded text-sm ${
                                page === currentPage
                                    ? 'bg-shade-neutral-10 text-black'
                                    : 'text-black hover:bg-shade-neutral-10'
                            }`}
                            onClick={() => handlePageClick(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className={`ml-4 ${
                            table.getCanNextPage()
                                ? 'text-black'
                                : 'text-[#9CA3AF] cursor-not-allowed'
                        } `}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Pagination
