import type { ColumnDef } from '@tanstack/react-table'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTable } from './use-table'

const columns: ColumnDef<unknown>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
]

const mockData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]

describe('useTable Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('initializes the table correctly', () => {
        const { result } = renderHook(() =>
            useTable({ data: mockData, columns }),
        )

        expect(
            result.current.table.getState().pagination.pageIndex,
        ).toBe(0)
        expect(result.current.table.getRowCount()).toBe(
            mockData.length,
        )
    })

    it('calculates correct startIndex and endIndex', () => {
        const { result } = renderHook(() =>
            useTable({ data: mockData, columns }),
        )

        expect(result.current.startIndex).toBe(0)
        expect(result.current.endIndex).toBe(mockData.length)
    })

    it('calls onPageClick when handlePageClick is triggered', () => {
        const mockOnPageClick = vi.fn()
        const { result } = renderHook(() =>
            useTable({
                data: mockData,
                columns,
                onPageClick: mockOnPageClick,
            }),
        )

        act(() => {
            result.current.handlePageClick(2)
        })

        expect(mockOnPageClick).toHaveBeenCalledWith(2)
    })

    it('updates page index when onPageClick is not provided', () => {
        const { result } = renderHook(() =>
            useTable({ data: mockData, columns }),
        )

        act(() => {
            result.current.handlePageClick(2)
        })

        expect(
            result.current.table.getState().pagination.pageIndex,
        ).toBe(1)
    })
})
