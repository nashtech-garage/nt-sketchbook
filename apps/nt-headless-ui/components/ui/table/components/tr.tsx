import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

type TrProps = {
    row: Row<unknown>
}

const Tr = (props: TrProps) => {
    const { row } = props
    return (
        <tr>
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                    <div>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </div>
                </td>
            ))}
        </tr>
    )
}

export default Tr
