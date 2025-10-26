import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'

import Tr from './tr'

vi.mock('@tanstack/react-table', () => ({
    flexRender: vi.fn()
}))

const createMockRow = (cellCount: number = 2): Row<unknown> => {
    return {
        getVisibleCells: vi.fn().mockReturnValue(
            Array.from({ length: cellCount }).map((_, i) => ({
                id: `cell${i + 1}`,
                column: { columnDef: { cell: `Cell ${i + 1}` } },
                getContext: vi.fn()
            }))
        )
    } as unknown as Row<unknown>
}

const renderWithTableWrapper = (component: ReactNode) =>
    render(
        <table>
            <tbody>{component}</tbody>
        </table>
    )

const setup = ({
    row = createMockRow()
}: {
    row?: Row<unknown>
} = {}) => {
    ;(flexRender as Mock).mockImplementation((cell) => cell)

    return renderWithTableWrapper(<Tr row={row} />)
}
describe('Tr component', () => {
    it('renders correctly with given props', () => {
        const { container } = setup()

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(2)
        expect(flexRender).toHaveBeenCalledTimes(2)
    })

    it('handles an empty row with no visible cells', () => {
        const emptyRow = createMockRow(0)
        const { container } = setup({ row: emptyRow })

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(0)
    })
})
