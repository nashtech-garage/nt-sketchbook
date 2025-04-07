import { cn } from '@/lib/utils'
import type {
    HeaderGroup,
    RowData,
    SortDirection,
} from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { ChevronsUpDown, MoveDown, MoveUp } from 'lucide-react'

type ThProps = {
    classTh?: string
    classFontSize?: string
    headerGroup: HeaderGroup<RowData>
}

const Th = (props: ThProps) => {
    const { classTh = '', classFontSize = '', headerGroup } = props
    return (
        <tr className={cn('!border-t-0 h-[44px]', classTh)}>
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
                            <div
                                className={cn(
                                    'uppercase !font-semibold  flex items-center justify-between pr-4 text-shade-neutral-70',
                                    classFontSize,
                                )}
                            >
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
