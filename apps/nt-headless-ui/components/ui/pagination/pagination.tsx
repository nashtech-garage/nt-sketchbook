import { cn } from '@/lib/utils'
import clsx from 'clsx'
import React from 'react'

export type PaginationProps = {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    showArrows?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    showArrows = true
}) => {
    if (totalPages <= 1) return null

    const handleClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <ul className="nt-pagination">
            {showArrows && (
                <li
                    className={cn(
                        'nt-pagination-item nt-pagination-prev',
                        {
                            disabled: currentPage === 1
                        }
                    )}
                    onClick={() =>
                        !(currentPage === 1) &&
                        handleClick(currentPage - 1)
                    }
                >
                    <span className="mdi mdi-arrow-left"></span>
                </li>
            )}

            {Array.from({ length: totalPages }, (_, idx) => {
                const page = idx + 1
                return (
                    <li
                        key={page}
                        className={clsx('nt-pagination-item', {
                            active: currentPage === page
                        })}
                    >
                        <button onClick={() => handleClick(page)}>
                            {page}
                        </button>
                    </li>
                )
            })}

            {showArrows && (
                <li
                    className={clsx(
                        'nt-pagination-item nt-pagination-next',
                        {
                            disabled: currentPage === totalPages
                        }
                    )}
                    onClick={() =>
                        !(currentPage === totalPages) &&
                        handleClick(currentPage + 1)
                    }
                >
                    <span className="mdi mdi-arrow-right"></span>
                </li>
            )}
        </ul>
    )
}
