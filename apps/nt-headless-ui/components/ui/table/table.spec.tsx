import type { ColumnDef } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/react-table'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { TableProps } from './table'
import { Table } from './table'

vi.mock('./components', () => ({
    Pagination: vi.fn(({ startIndex, endIndex, handlePageClick }) => (
        <div data-testid="mock-pagination">
            <span>Start: {startIndex}</span>
            <span>End: {endIndex}</span>
            <button onClick={() => handlePageClick(1)}>Page 1</button>
        </div>
    )),
    Th: vi.fn(({ headerGroup, classTh, classFontSize }) => (
        <thead data-testid="mock-th">
            <tr>
                <th
                    className={classTh}
                    style={{ fontSize: classFontSize }}
                >
                    {headerGroup?.id || 'Mock Header'}
                </th>
            </tr>
        </thead>
    )),
    Tr: vi.fn(({ row, classFontSizeBody }) => (
        <tr data-testid="mock-tr">
            <td className={classFontSizeBody}>
                {row?.id || 'Mock Row'}
            </td>
        </tr>
    )),
    TrLoading: vi.fn(() => (
        <tr data-testid="mock-tr-loading">
            <td>Loading...</td>
        </tr>
    )),
}))

vi.mock('./table.scss', () => ({}))

type Data = {
    id: number
    name: string
}

const columnHelper = createColumnHelper<Data>()
const columns: ColumnDef<Data>[] = [
    columnHelper.accessor('id', { header: 'ID' }) as ColumnDef<Data>,
    columnHelper.accessor('name', {
        header: 'Name',
    }) as ColumnDef<Data>,
]

const mockData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
]

const defaultProps: TableProps = {
    data: mockData,
    columns: columns as ColumnDef<unknown>[],
    itemPerPage: 2,
    isLoading: false,
    onPageClick: vi.fn(),
    onItemPerPageChange: vi.fn(),
}

describe('Table Component', () => {
    it('renders table with mocked components', () => {
        render(<Table {...defaultProps} />)

        expect(screen.getByTestId('mock-th')).toBeInTheDocument()
        expect(
            screen.queryAllByTestId('mock-tr').length,
        ).toBeGreaterThan(0)
        expect(
            screen.getByTestId('mock-pagination'),
        ).toBeInTheDocument()
    })

    it('shows loading state with mocked TrLoading', () => {
        render(<Table {...defaultProps} isLoading={true} />)

        expect(screen.getAllByTestId('mock-tr-loading')).toHaveLength(
            5,
        )
    })

    it('calls onPageClick when pagination is clicked', () => {
        render(<Table {...defaultProps} />)

        const pagination = screen.getByTestId('mock-pagination')
        fireEvent.click(pagination.querySelector('button')!)

        expect(defaultProps.onPageClick).toHaveBeenCalled()
    })
})
