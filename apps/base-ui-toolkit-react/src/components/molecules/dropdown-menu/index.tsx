import React, {
  Children,
  cloneElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import { combineClasses } from '@/utils/tailwind'

export { DropdownItem } from './dropdown-item'
export { DropdownItemGroup } from './dropdown-item-group'

type DropdownMenuProps = {
  children: ReactNode
  trigger: ReactNode | string
  className?: string
  shouldRenderToParent?: boolean
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    className = '',
    trigger,
    shouldRenderToParent = false,
    children,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleMenu}
        className={combineClasses(
          'inline-flex justify-center items-center gap-4 rounded-md border',
          'border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium ',
          'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          className,
        )}
      >
        {trigger}
        {typeof trigger === 'string' && <IoIosArrowDown />}
      </button>

      {isOpen && (
        <div
          className={combineClasses(
            'origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1',
            'ring-black ring-opacity-5',
            {
              'z-10': shouldRenderToParent,
            },
          )}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Children.map(children, (child) =>
              cloneElement(child as React.ReactElement<any>, {
                closeMenu: toggleMenu,
              }),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
