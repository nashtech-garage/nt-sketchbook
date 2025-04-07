import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Pagination from './pagination'

vi.mock('lucide-react', async (importOriginal) => {
    const actual = await importOriginal<
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        typeof import('lucide-react')
    >()
    return {
        ...actual,
        ChevronLeft: () => <svg data-testid="chevron-left" />,
        ChevronRight: () => <svg data-testid="chevron-right" />,
    }
})

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
    ),
}))

const mockTable = {
    getState: () => ({
        pagination: { pageIndex: 0, pageSize: 10 },
    }),
    getCanPreviousPage: vi.fn(() => false),
    getCanNextPage: vi.fn(() => true),
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    getPageCount: vi.fn(() => 5),
    getRowCount: vi.fn(() => 50),
    setPageSize: vi.fn(),
}

const setup = (overrides = {}) => {
    const defaultProps = {
        startIndex: 1,
        endIndex: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        table: mockTable as any,
        handlePageClick: vi.fn(),
        handleItemPerPageChange: vi.fn(),
        itemPerPage: 10,
        textItemsPerPage: 'Items per page',
        ...overrides,
    }

    render(<Pagination {...defaultProps} />)

    return {
        handlePageClick: defaultProps.handlePageClick,
        handleItemPerPageChange: defaultProps.handleItemPerPageChange,
    }
}

describe('Pagination Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders without crashing', () => {
        setup()
        expect(screen.getByText('Items per page')).toBeInTheDocument()
    })

    it('renders pagination buttons when there are multiple pages', () => {
        setup()
        expect(screen.getByTestId('chevron-left')).toBeInTheDocument()
        expect(
            screen.getByTestId('chevron-right'),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /1/i }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /2/i }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /5/i }),
        ).toBeInTheDocument()
    })

    it('calls handlePageClick when clicking a page button', () => {
        const { handlePageClick } = setup()
        fireEvent.click(screen.getByRole('button', { name: /2/i }))
        expect(handlePageClick).toHaveBeenCalledWith(2)
    })

    it('disables previous page button if there is no previous page', () => {
        setup()
        expect(
            screen.getByTestId('chevron-left').closest('button'),
        ).toBeDisabled()
    })

    it('calls nextPage when clicking the next page button', () => {
        setup()
        fireEvent.click(screen.getByTestId('chevron-right'))
        expect(mockTable.nextPage).toHaveBeenCalled()
    })

    it('updates page size when selecting a new page size', () => {
        const { handleItemPerPageChange } = setup()
        fireEvent.change(screen.getByTestId('mock-select'), {
            target: { value: '20' },
        })
        expect(handleItemPerPageChange).toHaveBeenCalledWith(20)
    })

    it('hides pagination controls when there is only one page', () => {
        mockTable.getCanPreviousPage.mockReturnValue(false)
        mockTable.getCanNextPage.mockReturnValue(false)
        mockTable.getPageCount.mockReturnValue(1)

        setup()

        expect(
            screen.queryByTestId('chevron-left'),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByTestId('chevron-right'),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: /1/i }),
        ).not.toBeInTheDocument()
    })
})
