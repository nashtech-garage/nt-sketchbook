import dayjs from 'dayjs'
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { Select } from '../../select'

const getMonth = (date: Date) => dayjs(date).month()
const getYear = (date: Date) => dayjs(date).year()
const startYear = 1900
const endYear = dayjs().year() + 1
const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
)

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
] as const

export const DatePickerHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
}: ReactDatePickerCustomHeaderProps) => (
    <div className="nt-datepicker-header">
        <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type="button"
            aria-label="Previous Month">
            <span className="nti nti-chevron-left"></span>
        </button>
        <Select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
                changeMonth(
                    months.indexOf(value as (typeof months)[number])
                )
            }
            options={months.map((month) => ({
                value: month,
                label: month
            }))}
        />
        <Select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(+value)}
            options={years.map((year) => ({
                value: year,
                label: year
            }))}
        />
        <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type="button"
            aria-label="Next Month">
            <span className="nti nti-chevron-right"></span>
        </button>
    </div>
)
