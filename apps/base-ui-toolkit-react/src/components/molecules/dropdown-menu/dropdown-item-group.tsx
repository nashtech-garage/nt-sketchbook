import { Children, cloneElement, ReactNode } from 'react'

import { combineClasses } from '@/utils/tailwind'

import { DropdownItemProps } from './dropdown-item'

type DropdownItemGroupProps = {
  children: ReactNode
  closeMenu?: () => void
  className?: string
}

export const DropdownItemGroup = (props: DropdownItemGroupProps) => {
  const { children, className = '', closeMenu } = props

  return (
    <div className={combineClasses(className)}>
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement<DropdownItemProps>, {
          closeMenu,
        }),
      )}
    </div>
  )
}
