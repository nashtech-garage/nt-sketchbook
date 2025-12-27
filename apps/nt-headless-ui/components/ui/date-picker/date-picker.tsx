import {
    DatePicker as ReactDatePicker,
    type DatePickerProps as ReactDatePickerProps
} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Input } from '../input'
import './date-picker.scss'
import { DatePickerHeader } from './header'

export type DatePickerProps = ReactDatePickerProps

export const DatePicker = (props: DatePickerProps) => {
    return (
        <ReactDatePicker
            wrapperClassName="nt-datepicker-wrapper"
            popperClassName="nt-datepicker-popper"
            className="nt--datepicker"
            renderCustomHeader={DatePickerHeader}
            customInput={<Input />}
            showPopperArrow={false}
            locale="en-GB"
            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
            {...props}
        />
    )
}
