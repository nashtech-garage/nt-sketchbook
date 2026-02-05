import type * as ReactTable from '@tanstack/react-table'
import type { HeaderGroup, RowData } from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Th from './th'

const toggleSortingMock = vi.fn()

vi.mock('@tanstack/react-table', async (importOriginal) => {
    const mod = await importOriginal<typeof ReactTable>()
    return {
        ...mod,
        flexRender: vi.fn((header) => header)
    }
})

vi.mock('lucide-react', () => ({
    MoveDown: () => <svg data-testid="move-down-icon" />,
    MoveUp: () => <svg data-testid="move-up-icon" />,
    ChevronsUpDown: () => <svg data-testid="chevrons-up-down-icon" />
}))

const setup = (
    sortDirection: 'asc' | 'desc' | false,
    isPlaceholder = false
) => {
    const headerGroup: HeaderGroup<{ header: string }> = {
        headers: [
            {
                id: 'sortableCol',
                colSpan: 1,
                isPlaceholder,
                column: {
                    columnDef: { header: 'Sortable Column' },
                    getCanSort: () => !isPlaceholder,
                    getToggleSortingHandler: () => toggleSortingMock,
                    getIsSorted: () => sortDirection
                },
                getContext: () => ({})
            }
        ]
    } as unknown as HeaderGroup<{ header: string }>

    render(
        <table>
            <thead>
                <Th
                    headerGroup={headerGroup as HeaderGroup<RowData>}
                />
            </thead>
        </table>
    )
}
describe('Th component', () => {
    it('renders correctly with headers', () => {
        setup(false)
        expect(
            screen.getByText('Sortable Column')
        ).toBeInTheDocument()
    })

    it('calls sorting handler when clicking a sortable column', async () => {
        setup('asc')
        await userEvent.click(screen.getByText('Sortable Column'))

        expect(toggleSortingMock).toHaveBeenCalled()
    })

    it('does not render content for placeholder headers', () => {
        setup(false, true)

        expect(screen.getByRole('columnheader')).toBeInTheDocument()
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders MoveDown icon when sorted in ascending order', () => {
        setup('asc')

        expect(
            screen.getByTestId('move-down-icon')
        ).toBeInTheDocument()
    })

    it('renders MoveUp icon when sorted in descending order', () => {
        setup('desc')

        expect(screen.getByTestId('move-up-icon')).toBeInTheDocument()
    })

    it('renders ChevronsUpDown icon when not sorted', () => {
        setup(false)

        expect(
            screen.getByTestId('chevrons-up-down-icon')
        ).toBeInTheDocument()
    })
})
