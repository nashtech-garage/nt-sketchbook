import { cn } from '@headless-ui/lib/utils'
import {
    flexRender,
    HeaderGroup,
    RowData,
    SortDirection,
} from '@tanstack/react-table'
import { ChevronsUpDown, MoveDown, MoveUp } from 'lucide-react'

type ThProps = {
    headerGroup: HeaderGroup<RowData>
}

const Th = (props: ThProps) => {
    const { headerGroup } = props
    return (
        <tr className="!border-t-0 h-[44px]">
            {headerGroup.headers.map((header) => (
                <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="text-left  !border-none !p-0 !pl-2  "
                >
                    {header.isPlaceholder ? null : (
                        <button
                            {...{
                                className: cn(' w-full', {
                                    'cursor-pointer select-none':
                                        header.column.getCanSort(),
                                }),
                                onClick:
                                    header.column.getToggleSortingHandler(),
                            }}
                        >
                            <div className="uppercase !font-semibold !text-xs flex items-center justify-between pr-4 text-shade-neutral-70">
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                                {header.column.getCanSort() && (
                                    <div className="flex flex-col ml-3">
                                        {{
                                            asc: (
                                                <MoveDown
                                                    size={14}
                                                    className="text-shade-neutral-70"
                                                />
                                            ),
                                            desc: (
                                                <MoveUp
                                                    size={14}
                                                    className="text-shade-neutral-70"
                                                />
                                            ),
                                        }[
                                            header.column.getIsSorted() as SortDirection
                                        ] ?? (
                                            <>
                                                <ChevronsUpDown
                                                    size={14}
                                                    className="text-shade-neutral-70"
                                                />
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
