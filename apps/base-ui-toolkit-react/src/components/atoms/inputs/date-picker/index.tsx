import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import './date-picker.scss'

import {
    DatePicker as ReactDatePicker,
    DatePickerProps as ReactDatePickerProps,
} from 'react-date-picker'

import { combineClasses } from '@/utils/tailwind'

type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export type DatePickerProps = {
    className?: string
} & ReactDatePickerProps

export const DatePicker = (props: DatePickerProps) => {
    const { className, clearIcon = null, ...restProps } = props

    return (
        <ReactDatePicker
            data-testid="date-picker"
            className={combineClasses(
                'react-datepicker w-full h-[45px] input-global bg-transparent rounded-md align-middle',
                className,
            )}
            clearIcon={clearIcon}
            {...restProps}
        />
    )
}
