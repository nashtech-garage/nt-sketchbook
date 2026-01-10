import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'
import { DatePicker as ReactDatePicker } from 'react-datepicker'

import { Input } from '../input'
import { DatePickerHeader } from './header/header'

type ReactDPProps = ComponentProps<typeof ReactDatePicker>
type SingleMode = Extract<
    ReactDPProps,
    {
        selectsRange?: false
        selectsMultiple?: false
    }
>

export type DatePickerProps = Omit<
    SingleMode,
    'renderCustomHeader' | 'customInput' | 'showPopperArrow'
>

export const DatePicker = ({
    wrapperClassName,
    popperClassName,
    className,
    ...restProps
}: DatePickerProps) => {
    return (
        <ReactDatePicker
            {...restProps}
            selectsRange={false}
            selectsMultiple={false}
            wrapperClassName={cn(
                'nt-datepicker-wrapper',
                wrapperClassName
            )}
            popperClassName={cn(
                'nt-datepicker-popper',
                popperClassName
            )}
            className={cn('nt-datepicker', className)}
            renderCustomHeader={DatePickerHeader}
            customInput={<Input />}
            showPopperArrow={false}
            locale="en-GB"
            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
        />
    )
}

export default DatePicker
