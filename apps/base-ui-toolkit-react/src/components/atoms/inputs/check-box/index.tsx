import { type InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { combineClasses } from '@/utils/tailwind'

export type CheckBoxProps = {
  label: string
  id?: string
  className?: string
  checkBoxClass?: string
  classLabel?: string
  registerHookForm?: UseFormRegisterReturn
} & InputHTMLAttributes<HTMLInputElement>

export const CheckBox = (props: CheckBoxProps) => {
  const {
    label,
    id = 'check',
    className,
    disabled,
    checkBoxClass = '',
    classLabel = '',
    registerHookForm,
    ...restProps
  } = props
  return (
    <label
      className={combineClasses(
        'flex items-center mt-3  align-middle',
        className,
        {
          'cursor-not-allowed': disabled,
        },
      )}
      htmlFor={id}
    >
      <input
        {...restProps}
        {...registerHookForm}
        id={id}
        type="checkbox"
        className={combineClasses(
          'form-checkbox h-4 w-4 text-gray-600 ',
          {
            'cursor-not-allowed !bg-gray-100 ': disabled,
          },
          checkBoxClass,
        )}
        disabled={disabled}
        data-testid="checkbox"
      />
      <span
        className={combineClasses('ml-2 text-gray-700 ', classLabel)}
      >
        {label}
      </span>
    </label>
  )
}
