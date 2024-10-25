import {
  flexRender,
  HeaderGroup,
  RowData,
  SortDirection,
} from '@tanstack/react-table'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { combineClasses } from '@/utils/tailwind'

type ThProps = {
  headerGroup: HeaderGroup<RowData>
}

const Th = (props: ThProps) => {
  const { headerGroup } = props
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <th
          key={header.id}
          colSpan={header.colSpan}
          scope="col"
          className="px-6 py-4 text-left text-xs font-medium text-gray-500"
        >
          {header.isPlaceholder ? null : (
            <button
              {...{
                className: combineClasses({
                  'cursor-pointer select-none':
                    header.column.getCanSort(),
                }),
                onClick: header.column.getToggleSortingHandler(),
              }}
            >
              <div className="flex items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() && (
                  <div className="flex flex-col ml-3">
                    {{
                      asc: <FaChevronDown size={10} />,
                      desc: <FaChevronUp size={10} />,
                    }[
                      header.column.getIsSorted() as SortDirection
                    ] ?? (
                      <>
                        <FaChevronUp size={10} />
                        <FaChevronDown size={10} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </button>
          )}
        </th>
      ))}
    </tr>
  )
}

export default Th
