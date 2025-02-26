import { flexRender, Row } from '@tanstack/react-table'

type TrProps = {
    classFontSizeBody?: string
    row: Row<unknown>
}

const Tr = (props: TrProps) => {
    const { classFontSizeBody, row } = props
    return (
        <tr className="hover:bg-gray-100 !border-none p-2 h-[44px]">
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="!p-0 !pl-2 !border-none">
                    <div className="flex items-center">
                        <div className={classFontSizeBody}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                        </div>
                    </div>
                </td>
            ))}
        </tr>
    )
}

export default Tr
