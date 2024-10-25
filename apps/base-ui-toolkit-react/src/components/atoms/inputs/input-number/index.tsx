import { type InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { combineClasses } from '@/utils/tailwind'

export type InputNumberProps = {
  className?: string
  registerHookForm?: UseFormRegisterReturn
} & InputHTMLAttributes<HTMLInputElement>

export const InputNumber = (props: InputNumberProps) => {
  const {
    disabled,
    className = '',
    registerHookForm,
    ...restProps
  } = props

  return (
    <input
      {...restProps}
      {...registerHookForm}
      type="number"
      className={combineClasses('flex h-12 input-global', className, {
        'cursor-not-allowed !bg-gray-100 ': disabled,
      })}
      data-testid="input-number"
    />
  )
}
