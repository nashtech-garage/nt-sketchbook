import type {
    HeaderGroup,
    RowData,
    SortDirection
} from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { ChevronsUpDown, MoveDown, MoveUp } from 'lucide-react'

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
                >
                    {header.isPlaceholder ? null : (
                        <div
                            className="nt-table-thead"
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                            {header.column.getCanSort() && (
                                <div>
                                    {{
                                        asc: <MoveDown size={14} />,
                                        desc: <MoveUp size={14} />
                                    }[
                                        header.column.getIsSorted() as SortDirection
                                    ] ?? <ChevronsUpDown size={14} />}
                                </div>
                            )}
                        </div>
                    )}
                </th>
            ))}
        </tr>
    )
}

export default Th
