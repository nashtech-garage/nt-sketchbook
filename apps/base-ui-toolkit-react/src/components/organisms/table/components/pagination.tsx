import { Table } from '@tanstack/react-table'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

type PaginationProps = {
  startIndex: number
  endIndex: number
  table: Table<any> //eslint-disable-line
}

const Pagination = (props: PaginationProps) => {
  const { startIndex, endIndex, table } = props
  return (
    <div className="text-xs text-gray-500 flex gap-8 items-center justify-between bg-white border-[#D4D4D8] border-t px-6 py-4 ">
      <span className="flex items-center gap-1">
        <div>Showing</div>
        {startIndex + 1} - {endIndex} of {table.getPageCount()}
        {table.getPageCount() > 1 ? 'pages' : 'page'}
      </span>
      {(table.getCanPreviousPage() || table.getCanNextPage()) && (
        <div>
          <button
            className={` ${
              table.getCanPreviousPage()
                ? 'text-black'
                : 'text-[#9CA3AF]'
            } `}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleLeft />
          </button>
          <button
            className={`ml-4 ${
              table.getCanNextPage() ? 'text-black' : 'text-[#9CA3AF]'
            } `}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default Pagination
