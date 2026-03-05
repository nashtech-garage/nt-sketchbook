import { addMonths, subMonths } from 'date-fns'

export interface DatePickerState {
    currentMonth: number
    currentYear: number
    isHighlightToday: boolean
    selectedDate: Date | null
}

export class NtDatePickerState implements DatePickerState {
    currentMonth = new Date().getMonth()
    currentYear = new Date().getFullYear()
    selectedDate: Date | null = null
    isHighlightToday: boolean = true

    nextMonth() {
        const date = addMonths(
            new Date(this.currentYear, this.currentMonth),
            1
        )
        this.currentMonth = date.getMonth()
        this.currentYear = date.getFullYear()
    }

    prevMonth() {
        const date = subMonths(
            new Date(this.currentYear, this.currentMonth),
            1
        )
        this.currentMonth = date.getMonth()
        this.currentYear = date.getFullYear()
    }

    setMonth(month: number) {
        this.currentMonth = month
    }

    setYear(year: number) {
        this.currentYear = year
    }
}
