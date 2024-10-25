import { type InputHTMLAttributes } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type TextAreaProps = {
  value?: string | number
  placeholder?: string
  id?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  className?: string
} & InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = (props: TextAreaProps) => {
  const {
    placeholder = '',
    id = '',
    onChange,
    isDisabled = false,
    className = '',
    value = undefined,
  } = props

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (onChange) {
      onChange(event?.target?.value)
    }
  }

  return (
    <textarea
      {...props}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={handleOnChange}
      disabled={isDisabled}
      className={combineClasses(
        'flex h-[200px] input-global ',
        className,
        {
          'cursor-not-allowed !bg-gray-100 ': isDisabled,
        },
      )}
    />
  )
}
