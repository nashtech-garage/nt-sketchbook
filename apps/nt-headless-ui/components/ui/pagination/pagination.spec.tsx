import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Pagination, type PaginationProps } from './pagination'

const onPageChangeMock = vi.fn()
const defaultProps: PaginationProps = {
    totalPages: 5,
    currentPage: 2,
    onPageChange: onPageChangeMock,
    showArrows: true
}

const setup = (props: Partial<PaginationProps> = {}) => {
    render(<Pagination {...defaultProps} {...props} />)
}

describe('Pagination', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        onPageChangeMock.mockClear()
    })

    it('next arrow disabled at last page', async () => {
        setup({ currentPage: 5 })
        const next = screen.getByText(
            (_, el) =>
                !!el && el.classList.contains('mdi-arrow-right')
        )
        await userEvent.click(next.closest('li')!)

        expect(onPageChangeMock).not.toHaveBeenCalled()
    })

    it('does not render if totalPages <= 1', () => {
        setup({ totalPages: 1 })
        expect(screen.queryByRole('list')).toBeNull()
    })

    it('renders correct number of page buttons', () => {
        setup()
        const buttons = screen.getAllByRole('button')

        expect(buttons).toHaveLength(5)
        expect(buttons[0]).toHaveTextContent('1')
        expect(buttons[1]).toHaveTextContent('2')
    })

    it('marks current page as active', () => {
        setup({ currentPage: 3 })
        const activePage = screen.getByText('3').closest('li')

        expect(activePage).toHaveClass('active')
    })

    it('calls onPageChange when another page is clicked', async () => {
        setup()
        await userEvent.click(screen.getByText('3'))

        expect(onPageChangeMock).toHaveBeenCalledWith(3)
    })

    it('handles previous arrow click', async () => {
        setup({ currentPage: 3 })
        const prev = screen.getByText(
            (_, el) => !!el && el.classList.contains('mdi-arrow-left')
        )
        await userEvent.click(prev.closest('li')!)

        expect(onPageChangeMock).toHaveBeenCalledWith(2)
    })

    it('handles next arrow click', async () => {
        setup({ currentPage: 2 })
        const next = screen.getByText(
            (_, el) =>
                !!el && el.classList.contains('mdi-arrow-right')
        )
        await userEvent.click(next.closest('li')!)

        expect(onPageChangeMock).toHaveBeenCalledWith(3)
    })

    it('does not render arrows when showArrows=false', () => {
        setup({ showArrows: false })

        expect(
            screen.queryByText(
                (_, el) =>
                    !!el && el.classList.contains('mdi-arrow-left')
            )
        ).toBeNull()

        expect(
            screen.queryByText(
                (_, el) =>
                    !!el && el.classList.contains('mdi-arrow-right')
            )
        ).toBeNull()
    })
})
