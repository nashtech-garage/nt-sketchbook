import type { Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { render } from '@testing-library/react'
import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'

import Tr from './tr'

vi.mock('@tanstack/react-table', () => ({
    flexRender: vi.fn(),
}))

const mockRow = {
    getVisibleCells: vi.fn().mockReturnValue([
        {
            id: 'cell1',
            column: { columnDef: { cell: 'Cell 1' } },
            getContext: vi.fn(),
        },
        {
            id: 'cell2',
            column: { columnDef: { cell: 'Cell 2' } },
            getContext: vi.fn(),
        },
    ]),
} as unknown as Row<unknown>

const renderWithTableWrapper = (component: JSX.Element) =>
    render(
        <table>
            <tbody>{component}</tbody>
        </table>,
    )

describe('Tr component', () => {
    it('renders correctly with given props', () => {
        ;(flexRender as Mock).mockImplementation((cell) => cell)

        const { container } = renderWithTableWrapper(
            <Tr classFontSizeBody="text-sm" row={mockRow} />,
        )

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(2)
        expect(
            container.querySelector('.text-sm'),
        ).toBeInTheDocument()
        expect(flexRender).toHaveBeenCalledTimes(2)
    })

    it('renders correctly without classFontSizeBody prop', () => {
        ;(flexRender as Mock).mockImplementation((cell) => cell)

        const { container } = renderWithTableWrapper(
            <Tr row={mockRow} />,
        )

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(2)
        expect(
            container.querySelector('.text-sm'),
        ).not.toBeInTheDocument()
    })

    it('handles an empty row with no visible cells', () => {
        const emptyRow = {
            getVisibleCells: vi.fn().mockReturnValue([]),
        } as unknown as Row<unknown>

        const { container } = renderWithTableWrapper(
            <Tr row={emptyRow} />,
        )

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(0)
    })
})
