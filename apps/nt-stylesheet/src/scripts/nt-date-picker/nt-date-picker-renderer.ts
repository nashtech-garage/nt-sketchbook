import { isToday } from 'date-fns'
import type { Cell } from './nt-date-picker-generator'
import {
    CellMonthPosition,
    DAYS_IN_WEEK,
    NtDatePickerGenerator
} from './nt-date-picker-generator'
import type { NtDatePickerState } from './nt-date-picker-state'

export const START_YEAR = 1900
export const END_YEAR = 2100
export const SUNDAY = 0
export const MONDAY = 1
export const TUESDAY = 2
export const WEDNESDAY = 3
export const SATURDAY = 6
export const MONTHS_IN_YEAR = 12
export const HEADER_BASE_YEAR = 2024
export const HEADER_BASE_DAY_OFFSET = 7

type DayOptions = {
    dayIndex: string
    isHighlightToday: boolean
    isOutsideMonth: boolean
    isSelectedDate: boolean
    isToday: boolean
    isWeekend: boolean
    selectedDate: NtDatePickerState['selectedDate']
}

export class NtDatePickerRenderer {
    render(state: NtDatePickerState) {
        const cells = NtDatePickerGenerator.generate(state)

        const weeks = this.generateWeeks(cells, state)
        const dayHeaders = this.dayHeaders()

        return `<div class="react-datepicker">
            <div class="react-datepicker__month-container">
                ${this.header(state)}
                <div class="table">
                    <div class="rowgroup">
                        <div class="react-datepicker__day-names">
                            ${dayHeaders}
                        </div>
                    </div>
                    <div class="react-datepicker__month">
                        ${weeks}
                    </div>
                </div>
            </div>
        </div>
        `
    }

    private header(state: NtDatePickerState) {
        return `
        <div class="react-datepicker__header react-datepicker__header--custom">
            <div class="nt-datepicker-header">
                <button data-prev>
                    <span class="nti nti-chevron-left"></span>
                </button>
                <select data-month name="month" aria-label="month" class="nt-select nt-select-default nt-select-medium">
                   ${this.monthOptions(state)}
                </select>
                <select data-year name="year" aria-label="year" class="nt-select nt-select-default nt-select-medium">
                   ${this.yearOptions(state)}
                </select>
                <button data-next>
                    <span class="nti nti-chevron-right"></span>
                </button>
            </div>
        </div>
        `
    }

    private generateWeeks(cells: Cell[], state: NtDatePickerState) {
        let html = ''
        for (let i = 0; i < cells.length; i += DAYS_IN_WEEK) {
            html += `<div class="react-datepicker__week" role="row">`

            cells.slice(i, i + DAYS_IN_WEEK).forEach((cell) => {
                html += this.createDayCell(cell, state)
            })

            html += `</div>`
        }

        return html
    }

    private createDayCell(cell: Cell, state: NtDatePickerState) {
        const { day, date, outside } = cell

        const dayOfWeek = date.getDay()
        const dayIndex = String(day).padStart(3, '0')

        const isWeekend =
            dayOfWeek === SUNDAY || dayOfWeek === SATURDAY

        const { selectedDate, isHighlightToday } = state
        const isSelected = Boolean(
            selectedDate &&
                date.toDateString() === selectedDate.toDateString()
        )

        const classes = this.buildDayClasses({
            isSelectedDate: isSelected,
            dayIndex,
            isWeekend,
            isToday: isToday(date),
            isOutsideMonth: outside !== CellMonthPosition.CURRENT,
            selectedDate,
            isHighlightToday
        })

        const ariaLabel = this.buildAriaLabel(date)

        const tabindex = isToday(date) ? 0 : -1

        return `
        <div
            class="${classes.join(' ')}"
            tabindex="${tabindex}"
            aria-label="${ariaLabel}"
            role="gridcell"
            aria-disabled="false"
            aria-selected="${isSelected}"
            data-day="${day}"
            data-outside="${outside}">${day}</div>
        `
    }

    private buildDayClasses({
        isSelectedDate,
        dayIndex,
        isWeekend,
        isToday,
        isOutsideMonth,
        selectedDate,
        isHighlightToday
    }: DayOptions): string[] {
        const classes = [
            'react-datepicker__day',
            `react-datepicker__day--${dayIndex}`
        ]
        if (isWeekend) classes.push('react-datepicker__day--weekend')

        if (isToday) classes.push('react-datepicker__day--today')

        if (isOutsideMonth)
            classes.push('react-datepicker__day--outside-month')

        if (isHighlightToday && isToday && !selectedDate)
            classes.push('react-datepicker__day--selected')

        if (isSelectedDate)
            classes.push('react-datepicker__day--selected')

        return classes
    }

    private buildAriaLabel(date: Date): string {
        return `Choose ${date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })}`
    }

    private dayHeaders() {
        const formatter = new Intl.DateTimeFormat('en-US', {
            weekday: 'short'
        })

        return Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
            const date = new Date(
                HEADER_BASE_YEAR,
                0,
                HEADER_BASE_DAY_OFFSET + i
            )
            const label = formatter.format(date)

            return `
                <div role="columnheader" class="react-datepicker__day-name">
                    <span class="react-datepicker__sr-only">${label}</span>
                    <span aria-hidden="true">${label}</span>
                </div>
            `
        }).join('')
    }

    private monthOptions(state: NtDatePickerState) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short'
        })

        return Array.from({ length: MONTHS_IN_YEAR }, (_, i) => {
            const label = formatter.format(new Date(0, i))
            const selected =
                i === state.currentMonth ? 'selected' : ''

            return `<option value="${i}" ${selected}>${label}</option>`
        }).join('')
    }

    private yearOptions(state: NtDatePickerState) {
        let html = ''

        for (let y = START_YEAR; y <= END_YEAR; y++) {
            const selected = y === state.currentYear ? 'selected' : ''

            html += `<option value="${y}" ${selected}>${y}</option>`
        }

        return html
    }
}
