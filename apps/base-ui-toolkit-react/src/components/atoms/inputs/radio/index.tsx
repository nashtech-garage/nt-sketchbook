import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { combineClasses } from '@/utils/tailwind'

export type RadioProps = {
  label: string
  id?: string
  className?: string
  registerHookForm?: UseFormRegisterReturn
} & InputHTMLAttributes<HTMLInputElement>

export const Radio = (props: RadioProps) => {
  const {
    label,
    id = 'radio',
    className,
    disabled,
    registerHookForm,
    ...restProps
  } = props
  return (
    <div
      className={combineClasses('flex items-center', className, {
        'cursor-not-allowed': disabled,
      })}
    >
      <input
        {...restProps}
        {...registerHookForm}
        id={id}
        type="radio"
        className={combineClasses(
          'h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300',
          {
            'cursor-not-allowed !bg-gray-100 ': disabled,
          },
        )}
        data-testid="radio"
      />
      <label
        htmlFor={id}
        className={combineClasses(
          'text-sm font-medium text-gray-900 ml-2 block',
          {
            'cursor-not-allowed': disabled,
          },
        )}
      >
        {label}
      </label>
    </div>
  )
}
