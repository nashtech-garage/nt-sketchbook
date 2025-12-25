import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
    args: {},
    render: (args: DatePickerProps) => {
        return <DatePicker {...args} />
    }
}
