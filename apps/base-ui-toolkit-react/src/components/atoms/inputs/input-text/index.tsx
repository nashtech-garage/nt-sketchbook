import { forwardRef, type InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { combineClasses } from '@/utils/tailwind'

export type InputTextProps = {
  className?: string
  registerHookForm?: UseFormRegisterReturn
} & InputHTMLAttributes<HTMLInputElement>

export const InputText = forwardRef(
  (props: InputTextProps, ref: any) => {
    const {
      className = '',
      disabled,
      registerHookForm,
      ...restProps
    } = props

    return (
      <input
        type="text"
        className={combineClasses(
          'flex h-12 input-global rounded-md',
          className,
          {
            'cursor-not-allowed !bg-gray-100 ': disabled,
          },
        )}
        data-testid="input-text"
        {...restProps}
        {...registerHookForm}
        ref={ref}
      />
    )
  },
)
