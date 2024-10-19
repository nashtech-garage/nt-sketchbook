import { InputHTMLAttributes, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { InputNumber, InputText } from '@/components/atoms'
import {
  CheckBox,
  CheckBoxProps,
} from '@/components/atoms/inputs/check-box'
import {
  DatePicker,
  DatePickerProps,
} from '@/components/atoms/inputs/date-picker'
import { InputTextProps } from '@/components/atoms/inputs/input-text'
import { Radio, RadioProps } from '@/components/atoms/inputs/radio'
import { Theme } from '@/types'
import { combineClasses } from '@/utils/tailwind'

export type InputTextGroupProps = {
  type?: 'text' | 'number'
} & InputTextProps

export type DateInputGroupProps = {
  type?: 'date-picker'
} & DatePickerProps

export type CheckBoxGroupProps = {
  type?: 'checkbox'
} & CheckBoxProps

export type RadioGroupProps = {
  type?: 'radio'
  listRadio: RadioProps[]
  classRadioWrapper?: string
} & InputHTMLAttributes<HTMLInputElement>

export type InputGroupProps = {
  label?: string
  prefix?: string | ReactNode
  classWrapper?: string
  theme?: Theme
  errorMessage?: string
  inputType?:
    | InputTextGroupProps
    | DateInputGroupProps
    | CheckBoxGroupProps
    | RadioGroupProps
  registerHookForm?: UseFormRegisterReturn
}

export const InputGroup = (props: InputGroupProps) => {
  const {
    label = '',
    prefix = '',
    classWrapper = '',
    errorMessage = '',
    inputType = {
      type: 'text',
    },
    registerHookForm,
  } = props

  const { ...restProps } = inputType

  const renderInput = (className = '') => {
    switch (inputType.type) {
      case 'text':
        return (
          <InputText
            className={combineClasses(className, {
              '!border-red-500': errorMessage,
            })}
            registerHookForm={registerHookForm}
            {...(restProps as InputTextProps)}
          />
        )
      case 'number':
        return (
          <InputNumber
            className={combineClasses(className, {
              '!border-red-500': errorMessage,
            })}
            registerHookForm={registerHookForm}
            {...(restProps as InputTextGroupProps)}
          />
        )
      case 'date-picker':
        return (
          <DatePicker
            className={combineClasses(className, {
              '!border-red-500': errorMessage,
            })}
            {...(restProps as DatePickerProps)}
          />
        )
      case 'checkbox':
        return (
          <CheckBox
            className={combineClasses(className)}
            registerHookForm={registerHookForm}
            {...(restProps as CheckBoxProps)}
          />
        )
      case 'radio':
        return (
          <div className={inputType.classRadioWrapper}>
            {inputType.listRadio.map((radio) => (
              <Radio
                key={radio.id}
                id={radio.id}
                {...radio}
                registerHookForm={registerHookForm}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  if (prefix) {
    return (
      <div
        className={combineClasses(
          'flex flex-col gap-3',
          classWrapper,
        )}
      >
        <label htmlFor="input">{label}</label>
        <div className="flex items-center ">
          <div
            className={combineClasses(
              'flex items-center whitespace-nowrap rounded-l-md',
              'border border-r-0 border-solid border-neutral-300 h-full p-[11px]',
              'relative',
              {
                'border-red-500': errorMessage,
              },
            )}
          >
            {prefix}
          </div>
          {renderInput('rounded-none rounded-r-md')}
        </div>
        {errorMessage && (
          <span className="text-red-600">{errorMessage}</span>
        )}
      </div>
    )
  }

  return (
    <div
      className={combineClasses(
        'flex flex-col gap-2 mb-2',
        classWrapper,
      )}
    >
      {label && <label htmlFor="input">{label}</label>}
      {renderInput()}
      {errorMessage && (
        <span
          className={combineClasses('text-red-600', {
            'ml-6': inputType.type === 'checkbox',
          })}
        >
          {errorMessage}
        </span>
      )}
    </div>
  )
}
