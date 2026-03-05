import { describe, expect, it } from 'vitest'
import { DAYS_IN_WEEK } from './nt-date-picker-generator'
import {
    MONTHS_IN_YEAR,
    NtDatePickerRenderer,
    WEDNESDAY
} from './nt-date-picker-renderer'
import { NtDatePickerState } from './nt-date-picker-state'

const setup = (options?: Partial<NtDatePickerState>) => {
    const state = Object.assign(new NtDatePickerState(), options)
    const renderer = new NtDatePickerRenderer()
    return renderer.render(state)
}

describe('NtDatePickerRenderer', () => {
    it('renders a wrapper container', () => {
        const html = setup()

        expect(html).toContain('react-datepicker')
        expect(html).toContain('react-datepicker__month-container')
    })

    it('renders day headers correctly', () => {
        const html = setup()

        expect(html).toContain('react-datepicker__day-names')
        expect(
            (html.match(/react-datepicker__day-name/g) || [])
                ?.length - 1
        ).toBe(DAYS_IN_WEEK)
    })

    it('renders 12 month options with the correct selected month', () => {
        const html = setup({ currentMonth: WEDNESDAY })
        const container = document.createElement('div')
        container.innerHTML = html
        const monthSelect =
            container.querySelector<HTMLSelectElement>(
                'select[data-month]'
            )

        expect(monthSelect!.options.length).toBe(MONTHS_IN_YEAR)
        expect(html).toContain(
            `<option value="${WEDNESDAY}" selected>`
        )
    })

    it('renders year options with the correct selected year', () => {
        const html = setup({ currentYear: 2025 })

        expect(html).toContain(
            `<option value="2025" selected>2025</option>`
        )
        expect(html).toContain(`<option value="1900"`)
        expect(html).toContain(`<option value="2100"`)
    })

    it('creates day cells with correct classes for today, selected, weekend, and outside month', () => {
        const today = new Date()
        const html = setup({
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear(),
            selectedDate: today
        })

        expect(html).toContain('react-datepicker__day--today')
        expect(html).toContain('react-datepicker__day--selected')
        expect(html).toMatch(/react-datepicker__day--weekend/)
    })

    it('builds proper aria-labels for day cells', () => {
        const html = setup()

        expect(html).toMatch(
            /aria-label="Choose [A-Za-z]+, [A-Za-z]+ \d+, \d+"/
        )
    })

    it('marks outside month days correctly', () => {
        const html = setup()

        expect(html).toMatch(/react-datepicker__day--outside-month/)
    })
})
