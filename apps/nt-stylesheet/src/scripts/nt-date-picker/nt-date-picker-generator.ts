import { isToday } from 'date-fns'
import type { NtDatePickerState } from './nt-date-picker-state'
import { getDaysInMonth } from './utils/get-day-in-month'
import { getFirstDayOfMonth } from './utils/get-first-day-of-month'

export enum CellMonthPosition {
    PREVIOUS = -1,
    CURRENT = 0,
    NEXT = 1
}

export const DAYS_IN_WEEK = 7

export type Cell = {
    date: Date
    day: number
    outside: CellMonthPosition
    isToday?: boolean
}

export class NtDatePickerGenerator {
    static generate(state: NtDatePickerState) {
        const cells: Cell[] = []

        cells.push(...this.generatePreviousMonthDays(state))

        cells.push(...this.generateCurrentMonthDays(state))

        cells.push(...this.generateNextMonthDays(state, cells.length))

        return cells
    }

    private static generatePreviousMonthDays(
        state: NtDatePickerState
    ): Cell[] {
        const cells: Cell[] = []

        const firstDay = getFirstDayOfMonth(
            state.currentYear,
            state.currentMonth
        )

        const prevMonthDays = getDaysInMonth(
            state.currentYear,
            state.currentMonth - 1
        )

        for (let i = firstDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i

            const date = new Date(
                state.currentYear,
                state.currentMonth - CellMonthPosition.PREVIOUS,
                day
            )

            cells.push({
                day,
                date,
                outside: CellMonthPosition.PREVIOUS
            })
        }

        return cells
    }

    private static generateCurrentMonthDays(
        state: NtDatePickerState
    ): Cell[] {
        const cells: Cell[] = []

        const daysInMonth = getDaysInMonth(
            state.currentYear,
            state.currentMonth
        )

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(
                state.currentYear,
                state.currentMonth,
                d
            )

            cells.push({
                day: d,
                date,
                outside: CellMonthPosition.CURRENT,
                isToday: isToday(date)
            })
        }

        return cells
    }

    private static generateNextMonthDays(
        state: NtDatePickerState,
        currentLength: number
    ): Cell[] {
        const cells: Cell[] = []

        const remainder = currentLength % DAYS_IN_WEEK

        if (remainder === 0) return cells

        const nextDays = DAYS_IN_WEEK - remainder

        for (let i = 1; i <= nextDays; i++) {
            const date = new Date(
                state.currentYear,
                state.currentMonth + 1,
                i
            )

            cells.push({
                day: i,
                date,
                outside: CellMonthPosition.NEXT
            })
        }

        return cells
    }
}
