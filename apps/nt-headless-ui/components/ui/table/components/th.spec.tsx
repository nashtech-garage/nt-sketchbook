import { HeaderGroup } from '@tanstack/react-table'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Th from './th'

vi.mock('@tanstack/react-table', async (importOriginal) => {
    const mod = await importOriginal<
        typeof import('@tanstack/react-table')
    >()
    return {
        ...mod,
        flexRender: vi.fn((header) => header),
    }
})

vi.mock('lucide-react', () => ({
    MoveDown: () => <svg data-testid="move-down-icon" />,
    MoveUp: () => <svg data-testid="move-up-icon" />,
    ChevronsUpDown: () => <svg data-testid="chevrons-up-down-icon" />,
}))

const setup = (
    sortDirection: 'asc' | 'desc' | false,
    isPlaceholder = false,
) => {
    const toggleSortingMock = vi.fn()

    const headerGroup: HeaderGroup<any> = {
        headers: [
            {
                id: 'sortableCol',
                colSpan: 1,
                isPlaceholder,
                column: {
                    columnDef: { header: 'Sortable Column' },
                    getCanSort: () => !isPlaceholder,
                    getToggleSortingHandler: () => toggleSortingMock,
                    getIsSorted: () => sortDirection,
                },
                getContext: () => ({}),
            },
        ],
    } as unknown as HeaderGroup<any>

    const utils = render(
        <table>
            <thead>
                <Th headerGroup={headerGroup} />
            </thead>
        </table>,
    )

    return { ...utils, toggleSortingMock }
}

describe('Th component', () => {
    it('renders correctly with headers', () => {
        const { getByText } = setup(false)

        expect(getByText('Sortable Column')).toBeInTheDocument()
    })

    it('calls sorting handler when clicking a sortable column', () => {
        const { getByText, toggleSortingMock } = setup('asc')

        fireEvent.click(getByText('Sortable Column'))
        expect(toggleSortingMock).toHaveBeenCalled()
    })

    it('does not render content for placeholder headers', () => {
        const { container } = setup(false, true)

        expect(container.querySelector('th')).toBeInTheDocument()
        expect(
            container.querySelector('button'),
        ).not.toBeInTheDocument()
    })

    it('renders MoveDown icon when sorted in ascending order', () => {
        const { getByTestId } = setup('asc')

        expect(getByTestId('move-down-icon')).toBeInTheDocument()
    })

    it('renders MoveUp icon when sorted in descending order', () => {
        const { getByTestId } = setup('desc')

        expect(getByTestId('move-up-icon')).toBeInTheDocument()
    })

    it('renders ChevronsUpDown icon when not sorted', () => {
        const { getByTestId } = setup(false)

        expect(
            getByTestId('chevrons-up-down-icon'),
        ).toBeInTheDocument()
    })
})
