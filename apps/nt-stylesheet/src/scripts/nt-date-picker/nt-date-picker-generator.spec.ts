import { describe, expect, it, vitest } from 'vitest'
import {
    CellMonthPosition,
    DAYS_IN_WEEK,
    NtDatePickerGenerator
} from './nt-date-picker-generator'
import type { NtDatePickerState } from './nt-date-picker-state'

const defaultState: NtDatePickerState = {
    currentMonth: 1,
    currentYear: 2024,
    selectedDate: null,
    isHighlightToday: true,
    nextMonth: vitest.fn(),
    prevMonth: vitest.fn(),
    setMonth: vitest.fn(),
    setYear: vitest.fn()
}

const FIRST_CELL = 0
const FIRST_INDEX = 0

const setup = (state?: Partial<NtDatePickerState>) =>
    NtDatePickerGenerator.generate({
        ...defaultState,
        ...state
    } as NtDatePickerState)

describe('NtDatePickerGenerator', () => {
    it('generates a full grid of dates with previous, current, and next month cells', () => {
        const cells = setup()
        expect(cells.length % DAYS_IN_WEEK).toBe(0)

        // First cell should be previous month or current month if the month starts on Sunday
        expect(cells[FIRST_CELL].outside).toBe(
            CellMonthPosition.PREVIOUS
        )

        // Last cell should be next month or current month
        expect(cells[cells.length - 1].outside).toBe(
            CellMonthPosition.NEXT
        )
    })

    it('marks today correctly', () => {
        const today = new Date()
        const cells = setup({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear()
        })

        expect(cells.find((cell) => cell.isToday)?.day).toBe(
            today.getDate()
        )
    })

    it('previous month cells have correct outside value', () => {
        const cells = setup()
        const prevCells = cells.filter(
            (cell) => cell.outside === CellMonthPosition.PREVIOUS
        )
        expect(
            prevCells.every(
                (cell) => cell.outside === CellMonthPosition.PREVIOUS
            )
        ).toBe(true)

        // They should be at the start of the grid
        expect(cells.indexOf(prevCells[FIRST_CELL])).toBe(FIRST_INDEX)
    })

    it('next month cells have correct outside value', () => {
        const cells = setup()
        const nextCells = cells.filter(
            (cell) => cell.outside === CellMonthPosition.NEXT
        )
        expect(
            nextCells.every(
                (cell) => cell.outside === CellMonthPosition.NEXT
            )
        ).toBe(true)

        expect(cells.indexOf(nextCells[FIRST_INDEX])).toBe(
            cells.length - nextCells.length
        )
    })

    it('current month cells have correct days', () => {
        const cells = setup()
        const currentCells = cells.filter(
            (cell) => cell.outside === CellMonthPosition.CURRENT
        )

        expect(currentCells[0].day).toBe(1)
        const lastDay = new Date(
            defaultState.currentYear,
            defaultState.currentMonth + 1,
            0
        ).getDate()
        expect(currentCells[currentCells.length - 1].day).toBe(
            lastDay
        )
    })
})
