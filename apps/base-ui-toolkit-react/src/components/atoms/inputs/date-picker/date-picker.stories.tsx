import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { DatePicker, Value } from '.'

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Components/Data Entry/DatePicker',
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const DateDefault: Story = {
  args: {},

  render: () => {
    const [startDate, setStartDate] = useState<Value>(new Date())
    return <DatePicker value={startDate} onChange={setStartDate} />
  },
}
