import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Select } from '../../select/select'

type PaginationProps = {
    startIndex: number
    endIndex: number
    table: Table<any> //eslint-disable-line
    handlePageClick: (page: number) => void
}

const Pagination = (props: PaginationProps) => {
    const { handlePageClick, table } = props
    const currentPage = table.getState().pagination.pageIndex + 1
    return (
        <div className="text-xs text-gray-500 flex items-center justify-between bg-white border-[#D4D4D8] ">
            <div className="flex items-center gap-3 w-[200px]">
                <Select
                    options={[
                        { label: '10', value: '10' },
                        { label: '20', value: '20' },
                    ]}
                    value="10"
                    className="w-[63px]"
                />
                <span className="text-xs">Items on page</span>
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
                                    ? 'bg-grey text-black'
                                    : 'text-black hover:bg-grey'
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
