import { Table } from '@tanstack/react-table'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import TrLoading from './tr-loading'

vi.mock('./td-skeleton', () => ({
    default: () => <div data-testid="td-skeleton" />,
}))

const mockTable = {
    getHeaderGroups: vi.fn().mockReturnValue([
        {
            headers: [
                { id: 'col1', colSpan: 1 },
                { id: 'col2', colSpan: 1 },
            ],
        },
    ]),
} as unknown as Table<unknown>

const renderWithTableWrapper = (component: JSX.Element) => {
    return render(
        <table>
            <tbody>{component}</tbody>
        </table>,
    )
}
describe('TrLoading component', () => {
    it('renders correctly with given table headers', () => {
        const { container } = renderWithTableWrapper(
            <TrLoading table={mockTable} />,
        )

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(2)
    })

    it('renders TdSkeleton inside each td', () => {
        const { getAllByTestId } = renderWithTableWrapper(
            <TrLoading table={mockTable} />,
        )

        expect(getAllByTestId('td-skeleton')).toHaveLength(2)
    })

    it('handles empty header group correctly', () => {
        const emptyTable = {
            getHeaderGroups: vi.fn().mockReturnValue([]),
        } as unknown as Table<unknown>

        const { container } = renderWithTableWrapper(
            <TrLoading table={emptyTable} />,
        )

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(0)
    })
})
