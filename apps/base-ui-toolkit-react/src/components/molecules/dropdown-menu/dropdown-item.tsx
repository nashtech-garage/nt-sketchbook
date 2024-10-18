import { ReactNode } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type DropdownItemProps = {
  children: ReactNode
  onClick?: () => void
  closeMenu?: () => void
  className?: string
}

export const DropdownItem = (props: DropdownItemProps) => {
  const { children, className = '', onClick, closeMenu } = props

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation()
    if (onClick) {
      onClick()
    }
    if (closeMenu) {
      closeMenu()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={combineClasses(
        'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        className,
      )}
      role="menuitem"
    >
      {children}
    </button>
  )
}
