import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination, PaginationProps } from '.'

describe('Test pagination component', () => {
  const renderPagination = (props = {}) => {
    const defaultProps = {
      total: 100,
      totalPerPage: 10,
      defaultPage: 1,
      pageWindowSize: 5,
      showLastPageAndFirstPage: true,
      onSetPage: vi.fn(),
    } as PaginationProps

    return render(<Pagination {...defaultProps} {...props} />)
  }

  test('renders pagination buttons correctly', () => {
    renderPagination()
    expect(screen.getByTestId('first page')).toBeTruthy()
    expect(screen.getByTestId('previous page')).toBeTruthy()
    expect(screen.getByTestId('next page')).toBeTruthy()
    expect(screen.getByTestId('last page')).toBeTruthy()
  })

  test('disables "previous" and "first" buttons on first page', () => {
    renderPagination()
    const firstPage = screen.getByTestId(
      'first page',
    ) as HTMLButtonElement
    const previousPage = screen.getByTestId(
      'first page',
    ) as HTMLButtonElement
    expect(firstPage.disabled).toBeTruthy()
    expect(previousPage.disabled).toBeTruthy()
  })

  test('disables "next" and "last" buttons on last page', () => {
    renderPagination({ defaultPage: 10 })
    const nextPage = screen.getByTestId(
      'next page',
    ) as HTMLButtonElement
    const lastPage = screen.getByTestId(
      'last page',
    ) as HTMLButtonElement
    expect(nextPage.disabled).toBeTruthy()
    expect(lastPage.disabled).toBeTruthy()
  })

  test('calls onSetPage when a page number is clicked', () => {
    const onSetPage = vi.fn()
    renderPagination({ onSetPage })

    fireEvent.click(screen.getByText('2'))
    expect(onSetPage).toHaveBeenCalledWith(2)
  })

  test('calls onSetPage when "next" button is clicked', () => {
    const onSetPage = vi.fn()
    renderPagination({ onSetPage })
    fireEvent.click(screen.getByTestId('next page'))
    expect(onSetPage).toHaveBeenCalledWith(2)
  })

  test('calls onSetPage when "previous" button is clicked', () => {
    const onSetPage = vi.fn()
    renderPagination({ defaultPage: 2, onSetPage })
    fireEvent.click(screen.getByTestId('previous page'))
    expect(onSetPage).toHaveBeenCalledWith(1)
  })

  test('calls onSetPage when "first page" button is clicked', () => {
    const onSetPage = vi.fn()
    renderPagination({ defaultPage: 5, onSetPage })
    fireEvent.click(screen.getByTestId('first page'))
    expect(onSetPage).toHaveBeenCalledWith(1)
  })

  test('calls onSetPage when "last page" button is clicked', () => {
    const onSetPage = vi.fn()
    renderPagination({ onSetPage })
    fireEvent.click(screen.getByTestId('last page'))
    expect(onSetPage).toHaveBeenCalledWith(10)
  })

  test('shows "next 5 pages" button when there are more pages', () => {
    renderPagination()
    expect(
      screen.getByTestId('next pageWindowSize item'),
    ).toBeTruthy()
  })

  test('shows "previous 5 pages" button when there are previous pages', () => {
    renderPagination()
    fireEvent.click(screen.getByTestId('last page'))
    expect(
      screen.getByTestId('previous pageWindowSize item'),
    ).toBeTruthy()
  })
})
