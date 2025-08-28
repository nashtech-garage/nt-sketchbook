import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Pagination, { type PaginationProps } from './pagination-table'

vi.mock('../../select/select', () => ({
    Select: ({ onChange }: { onChange: (value: string) => void }) => (
        <select
            data-testid="mock-select"
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    )
}))

const mockNextPage = vi.fn()

const mockTable = {
    getState: () => ({
        pagination: { pageIndex: 0, pageSize: 10 }
    }),
    getCanPreviousPage: vi.fn(() => false),
    getCanNextPage: vi.fn(() => true),
    previousPage: vi.fn(),
    nextPage: mockNextPage,
    getPageCount: vi.fn(() => 5),
    getRowCount: vi.fn(() => 50),
    setPageSize: vi.fn()
}

const mockHandleItemPerPageChange = vi.fn()
const mockHandlePageClick = vi.fn()

const setup = (props?: Partial<PaginationProps>) => {
    const defaultProps = {
        startIndex: 1,
        endIndex: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        table: mockTable as any,
        handlePageClick: mockHandlePageClick,
        handleItemPerPageChange: mockHandleItemPerPageChange,
        itemPerPage: 10,
        textItemsPerPage: 'Items per page',
        ...props
    }

    return render(<Pagination {...defaultProps} />)
}

const getArrow = (position: string) =>
    screen
        .queryByText(
            (_, el) =>
                !!el && el.classList.contains('mdi-arrow-' + position)
        )
        ?.closest('li')
const user = userEvent.setup()
describe('Pagination table Component', () => {
    beforeEach(() => vi.clearAllMocks())

    it('renders without crashing', () => {
        setup()

        expect(screen.getByText('Items per page')).toBeInTheDocument()
    })

    it('renders pagination buttons when there are multiple pages', () => {
        setup()

        expect(getArrow('left')).toBeInTheDocument()
        expect(getArrow('right')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /1/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /2/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /5/i })
        ).toBeInTheDocument()
    })

    it('calls handlePageClick when clicking a page button', async () => {
        setup()

        await user.click(screen.getByRole('button', { name: /2/i }))

        expect(mockHandlePageClick).toHaveBeenCalledWith(2)
    })

    it('disables previous page button if there is no previous page', () => {
        setup()
        expect(getArrow('left')?.classList).toContain('disabled')
    })

    it('calls nextPage when clicking the next page button', async () => {
        setup()

        await user.click(getArrow('right')!)

        expect(mockHandlePageClick).toHaveBeenCalled()
    })

    it('updates page size when selecting a new page size', async () => {
        setup()

        await user.selectOptions(
            screen.getByTestId('mock-select'),
            '20'
        )

        expect(mockHandleItemPerPageChange).toHaveBeenCalledWith(20)
    })

    it('hides pagination controls when there is only one page', () => {
        mockTable.getCanPreviousPage.mockReturnValue(false)
        mockTable.getCanNextPage.mockReturnValue(false)
        mockTable.getPageCount.mockReturnValue(1)

        setup()

        expect(getArrow('right')).toBeUndefined()
        expect(getArrow('left')).toBeUndefined()
        expect(
            screen.queryByRole('button', { name: /1/i })
        ).not.toBeInTheDocument()
    })
})
