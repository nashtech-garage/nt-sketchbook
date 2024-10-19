import { useEffect, useMemo, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'

import { Tooltip } from '@/components/atoms'

import { PageButton } from './page-button'

export type ClassName = {
  wrapper: string
  item: string
  cursor: string
}

export type PaginationProps = {
  total: number
  totalPerPage?: number
  className?: ClassName
  defaultPage?: number
  pageWindowSize?: number
  showLastPageAndFirstPage?: boolean
  onSetPage?: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    total = 10,
    totalPerPage = 5,
    defaultPage = 1,
    pageWindowSize = 5,
    showLastPageAndFirstPage = true,
    onSetPage,
  } = props

  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [pageWindowStart, setPageWindowStart] = useState(1)

  useEffect(() => {
    onSetPage!(currentPage)
  }, [currentPage])

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    if (pageNumber >= pageWindowStart + pageWindowSize) {
      setPageWindowStart(pageNumber)
    }
  }

  const numberOfPages = useMemo(
    () => Math.ceil(total / totalPerPage),
    [total, totalPerPage],
  )

  const handleNextPageWindow = () => {
    const newStart = Math.min(
      pageWindowStart + pageWindowSize,
      numberOfPages - pageWindowSize + 1,
    )
    setPageWindowStart(newStart)
    setCurrentPage(currentPage + pageWindowSize)
  }

  const handlePrevPageWindow = () => {
    const newStart = Math.max(pageWindowStart - pageWindowSize, 1)
    setPageWindowStart(newStart)
    setCurrentPage(currentPage - pageWindowSize)
  }

  const handleFirstPage = () => {
    handleClick(1)
    setPageWindowStart(1)
  }

  const handleLastPage = () => {
    handleClick(numberOfPages)
    setPageWindowStart(numberOfPages)
  }

  const getPageNumbers = () => {
    const endPage = Math.min(
      pageWindowStart + pageWindowSize - 1,
      numberOfPages,
    )
    return Array.from(
      { length: endPage - pageWindowStart + 1 },
      (_, index) => pageWindowStart + index,
    )
  }

  return (
    <div className="flex items-center gap-1">
      {showLastPageAndFirstPage && (
        <Tooltip position="bottom" message="First page">
          <PageButton
            className={className?.item}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            data-testid="first page"
          >
            <LuChevronFirst size={13} />
          </PageButton>
        </Tooltip>
      )}
      <Tooltip message="Previous page">
        <PageButton
          className={className?.item}
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="previous page"
        >
          <FaChevronLeft size={13} />
        </PageButton>
      </Tooltip>
      <div className="flex gap-1">
        {pageWindowStart > 1 && (
          <Tooltip
            position="bottom"
            message={`Show previous ${pageWindowSize} pages`}
          >
            <PageButton
              className={className?.item}
              data-testid="previous pageWindowSize item"
              onClick={handlePrevPageWindow}
            >
              <BsThreeDots size={13} />
            </PageButton>
          </Tooltip>
        )}
        {getPageNumbers().map((pageNumber) => (
          <PageButton
            key={pageNumber}
            onClick={() => handleClick!(pageNumber)}
            className={`px-[10px] py-[4px] text-[13px] h-[30px] ${className?.item} 
            ${
              currentPage === pageNumber && 'text-white bg-blue-500'
            }  hover:text-white hover:bg-blue-500 `}
          >
            {pageNumber}
          </PageButton>
        ))}
        {pageWindowStart + pageWindowSize - 1 < numberOfPages && (
          <Tooltip
            position="bottom"
            message={`Show next ${pageWindowSize} pages`}
          >
            <PageButton
              className={className?.item}
              data-testid="next pageWindowSize item"
              onClick={handleNextPageWindow}
            >
              <BsThreeDots size={13} />
            </PageButton>
          </Tooltip>
        )}
      </div>
      <Tooltip position="bottom" message="Next page">
        <PageButton
          className={className?.item}
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          data-testid="next page"
        >
          <FaChevronRight size={13} />
        </PageButton>
      </Tooltip>
      {showLastPageAndFirstPage && (
        <Tooltip position="bottom" message="Last page">
          <PageButton
            className={className?.item}
            onClick={() => handleLastPage()}
            disabled={currentPage === numberOfPages}
            data-testid="last page"
          >
            <LuChevronLast size={13} />
          </PageButton>
        </Tooltip>
      )}
    </div>
  )
}
