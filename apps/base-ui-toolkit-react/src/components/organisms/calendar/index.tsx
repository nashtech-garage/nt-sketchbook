import 'react-big-calendar/lib/css/react-big-calendar.css'

import dayjs from 'dayjs'
import {
    Calendar as ReactCalendar,
    CalendarProps as ReactCalendarProps,
    dayjsLocalizer,
} from 'react-big-calendar'

const localizer = dayjsLocalizer(dayjs)

export type CalendarProps = {
    style?: React.CSSProperties
} & ReactCalendarProps

export const Calendar = (props: CalendarProps) => {
    const {
        className = '',
        startAccessor = 'start',
        endAccessor = 'start',
        style = { height: 700 },
        ...resetProps
    } = props

    return (
        <ReactCalendar
            startAccessor={startAccessor}
            endAccessor={endAccessor}
            className={className}
            {...resetProps}
            localizer={localizer}
            style={style}
        />
    )
}
