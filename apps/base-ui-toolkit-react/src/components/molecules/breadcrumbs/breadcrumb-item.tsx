import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { combineClasses } from '@/utils/tailwind'

export type BreadcrumbItemProps = {
  to?: string
  children: ReactNode
  startContent?: ReactNode
  className?: string
  isDisabled?: boolean
  isCurrent?: boolean
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const {
    to = '',
    children,
    startContent = null,
    className,
    isDisabled = false,
    isCurrent = false,
  } = props

  if (isDisabled) {
    return (
      <span
        data-testid="listitem"
        className="text-gray-500 cursor-not-allowed"
      >
        {children}
      </span>
    )
  }

  return (
    <div
      data-testid="listitem"
      className={combineClasses(className, {
        'flex flex-row gap-2': !startContent,
      })}
    >
      {startContent && startContent}
      {to ? (
        <Link
          to={to}
          className={`hover:underline ${!isCurrent && 'opacity-50'}`}
        >
          {children}
        </Link>
      ) : (
        <span className={` ${!isCurrent && 'opacity-50'}`}>
          {children}
        </span>
      )}
    </div>
  )
}
