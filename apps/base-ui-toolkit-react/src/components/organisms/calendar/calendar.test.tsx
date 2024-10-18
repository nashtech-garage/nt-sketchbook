import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { dayjsLocalizer } from 'react-big-calendar'

import { Calendar, CalendarProps } from '.'

describe('Calendar Component', () => {
  const defaultProps: CalendarProps = {
    events: [],
    style: { height: 700 },
    localizer: dayjsLocalizer(dayjs),
  }

  it('renders without crashing', () => {
    const { container } = render(<Calendar {...defaultProps} />)
    expect(container).toBeTruthy()
  })

  it('uses the correct accessors', () => {
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        events={[{ start: new Date(), title: 'Test Event' }]}
        startAccessor="start"
        endAccessor="start"
      />,
    )
    expect(getByText('Test Event')).toBeTruthy()
  })

  it('displays events correctly', () => {
    const events = [
      {
        start: dayjs().toDate(),
        end: dayjs().add(1, 'hour').toDate(),
        title: 'Event 1',
      },
      {
        start: dayjs().add(1, 'day').toDate(),
        end: dayjs().add(1, 'day').add(1, 'hour').toDate(),
        title: 'Event 2',
      },
    ]

    render(<Calendar {...defaultProps} events={events} />)

    expect(screen.getByText('Event 1')).toBeTruthy()
    expect(screen.getByText('Event 2')).toBeTruthy()
  })
})
