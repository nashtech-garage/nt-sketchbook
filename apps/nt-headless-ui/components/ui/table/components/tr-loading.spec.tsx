import type { Table } from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import TrLoading from './tr-loading'

vi.mock('./td-skeleton', () => ({
    default: () => <div data-testid="td-skeleton" />
}))

const createMockTable = (withHeaders = true): Table<unknown> =>
    ({
        getHeaderGroups: vi.fn().mockReturnValue(
            withHeaders
                ? [
                      {
                          headers: [
                              { id: 'col1', colSpan: 1 },
                              { id: 'col2', colSpan: 1 }
                          ]
                      }
                  ]
                : []
        )
    }) as unknown as Table<unknown>

const renderWithTableWrapper = (component: JSX.Element) =>
    render(
        <table>
            <tbody>{component}</tbody>
        </table>
    )

const setup = (table: Table<unknown>) => {
    return renderWithTableWrapper(<TrLoading table={table} />)
}

describe('TrLoading component', () => {
    it('renders correctly with given table headers', () => {
        const { container } = setup(createMockTable())

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(2)
    })

    it('renders TdSkeleton inside each td', () => {
        setup(createMockTable())

        expect(screen.getAllByTestId('td-skeleton')).toHaveLength(2)
    })

    it('handles empty header group correctly', () => {
        const { container } = setup(createMockTable(false))

        expect(container.querySelector('tr')).toBeInTheDocument()
        expect(container.querySelectorAll('td')).toHaveLength(0)
    })
})
