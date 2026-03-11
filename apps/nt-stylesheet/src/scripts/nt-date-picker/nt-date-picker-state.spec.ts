import { addMonths, subMonths } from 'date-fns'
import { describe, expect, it } from 'vitest'
import {
    NtDatePickerState,
    type DatePickerState
} from './nt-date-picker-state'

const defaultState: DatePickerState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedDate: null,
    isHighlightToday: true
}

const NEXT_MONTH_INCREMENT = 1
const MONTHS_IN_YEAR = 12

const setup = (state?: Partial<DatePickerState>) =>
    Object.assign(new NtDatePickerState(), {
        ...defaultState,
        ...state
    })

describe('NtDatePickerState', () => {
    it('initializes with correct default values', () => {
        const state = setup()
        const now = new Date()

        expect(state.currentMonth).toBe(now.getMonth())
        expect(state.currentYear).toBe(now.getFullYear())
        expect(state.selectedDate).toBeNull()
        expect(state.isHighlightToday).toBe(true)
    })

    it('nextMonth() advances month and year correctly', () => {
        const state = setup()
        const oldMonth = state.currentMonth
        const oldYear = state.currentYear

        state.nextMonth()
        const expected = addMonths(
            new Date(oldYear, oldMonth),
            NEXT_MONTH_INCREMENT
        )

        expect(state.currentMonth).toBe(expected.getMonth())
        expect(state.currentYear).toBe(expected.getFullYear())
    })

    it('prevMonth() goes back month and year correctly', () => {
        const state = setup()
        const oldMonth = state.currentMonth
        const oldYear = state.currentYear

        state.prevMonth()
        const expected = subMonths(
            new Date(oldYear, oldMonth),
            NEXT_MONTH_INCREMENT
        )

        expect(state.currentMonth).toBe(expected.getMonth())
        expect(state.currentYear).toBe(expected.getFullYear())
    })

    it('setMonth() updates the month', () => {
        const state = setup()
        const newMonth = (state.currentMonth + 5) % MONTHS_IN_YEAR
        state.setMonth(newMonth)

        expect(state.currentMonth).toBe(newMonth)
    })

    it('setYear() updates the year', () => {
        const state = setup()
        const newYear = state.currentYear + 10
        state.setYear(newYear)

        expect(state.currentYear).toBe(newYear)
    })

    it('nextMonth() and prevMonth() handle year boundaries', () => {
        const state = setup({ currentMonth: 11, currentYear: 2024 })
        state.nextMonth()

        expect(state.currentMonth).toBe(0)
        expect(state.currentYear).toBe(2025)

        state.setMonth(0)
        state.setYear(2025)
        state.prevMonth()

        expect(state.currentMonth).toBe(11)
        expect(state.currentYear).toBe(2024)
    })
})
