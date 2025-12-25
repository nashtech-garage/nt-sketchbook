import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

import type { DatePickerProps } from './date-picker'
import { DatePicker } from './date-picker'

const meta: Meta<DatePickerProps> = {
    title: 'Components/DatePicker',
    component: DatePicker,
    argTypes: {},
    args: {
        dateFormat: 'dd/MM/yyyy'
    }
}

export default meta

export const Default: StoryObj<DatePickerProps> = {
    render: (args: DatePickerProps) => {
        const [value, setValue] = useState<Date>(new Date())

        return (
            <DatePicker
                {...args}
                selectsRange={false}
                selected={value}
                onChange={(date: Date | null) => {
                    if (date instanceof Date) {
                        setValue(date)
                    }
                }}
            />
        )
    }
}
