import { ButtonHTMLAttributes, ReactNode } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type PageButtonType = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const PageButton = (props: PageButtonType) => {
  const { children, className = '', disabled, ...restProps } = props
  return (
    <button
      className={combineClasses(
        'inline-flex items-center rounded-md p-2 ring-1 ring-inset',
        'focus:z-20 focus:outline-offset-0 outline-none shadow-sm',
        'text-white bg-zinc-600 hover:bg-zinc-500 cursor-pointer',
        { 'cursor-not-allowed': disabled },
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  )
}
