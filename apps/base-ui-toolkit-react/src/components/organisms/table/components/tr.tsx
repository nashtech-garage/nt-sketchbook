import { flexRender, Row } from '@tanstack/react-table'

type TrProps = {
    row: Row<any> // eslint-disable-line
}

const Tr = (props: TrProps) => {
    const { row } = props
    return (
        <tr className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
                <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                >
                    <div className="flex items-center">
                        <div className="text-sm text-gray-900">
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
