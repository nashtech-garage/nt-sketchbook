import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NtDatePickerPanel } from './nt-date-picker-panel'
import {
    NtDatePickerState,
    type DatePickerState
} from './nt-date-picker-state'

import userEvent from '@testing-library/user-event'

const defaultState: DatePickerState = {
    currentMonth: 0,
    currentYear: 2024,
    selectedDate: null,
    isHighlightToday: true
}

const mockSelect = vi.fn()
const mockYear = 2030
const mockMonth = 5
const MOCK_PANEL_LEFT = 10
const MOCK_PANEL_TOP = 20
const MOCK_PANEL_WIDTH = 0
const MOCK_PANEL_HEIGHT = 20

const setup = (options?: Partial<DatePickerState>) => {
    const state = Object.assign(new NtDatePickerState(), {
        ...defaultState,
        ...options
    })

    vi.spyOn(state, 'nextMonth')
    vi.spyOn(state, 'prevMonth')
    vi.spyOn(state, 'setMonth')
    vi.spyOn(state, 'setYear')
    const panel = new NtDatePickerPanel(state)

    const input = document.createElement('input')
    document.body.appendChild(input)

    return { panel, state, input }
}

describe('NtDatePickerPanel', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('creates a panel element on construction', () => {
        const { panel } = setup()

        expect(document.body.contains(panel.element)).toBe(true)
        expect(panel.element.style.display).toBe('none')
    })

    it('open() sets position and displays panel', () => {
        const { panel, input } = setup()
        input.getBoundingClientRect = vi.fn(
            () =>
                new DOMRect(
                    MOCK_PANEL_LEFT,
                    0,
                    MOCK_PANEL_WIDTH,
                    MOCK_PANEL_HEIGHT
                )
        )
        panel.open(input)

        expect(panel.element.style.display).toBe('block')
        expect(panel.element.style.left).toBe(`${MOCK_PANEL_LEFT}px`)
        expect(panel.element.style.top).toBe(`${MOCK_PANEL_TOP}px`)
    })

    it('close() hides the panel', () => {
        const { panel, input } = setup()
        panel.open(input)
        panel.close()
        expect(panel.element.style.display).toBe('none')
    })

    it('prevEvent() calls state.prevMonth', async () => {
        const { panel, state, input } = setup()
        panel.open(input)

        const prevBtn = panel.element.querySelector('[data-prev]')

        await userEvent.click(prevBtn as HTMLButtonElement)

        expect(state.prevMonth).toHaveBeenCalled()
    })

    it('nextEvent() calls state.nextMonth', async () => {
        const { panel, state, input } = setup()
        panel.open(input)

        const nextBtn =
            panel.element.querySelector<HTMLSelectElement>(
                '[data-next]'
            )

        await userEvent.click(nextBtn!)

        expect(state.nextMonth).toHaveBeenCalled()
    })

    it('monthEvent() updates state month', async () => {
        const { panel, state, input } = setup()

        panel.open(input)

        const select =
            panel.element.querySelector<HTMLSelectElement>(
                '[data-month]'
            )

        await userEvent.selectOptions(select!, String(mockMonth))

        expect(state.setMonth).toHaveBeenCalledWith(mockMonth)
    })

    it('yearEvent() updates state year', async () => {
        const { panel, state, input } = setup()

        panel.open(input)

        const select =
            panel.element.querySelector<HTMLSelectElement>(
                '[data-year]'
            )
        expect(select).toBeTruthy()

        await userEvent.selectOptions(select!, String(mockYear))

        expect(state.setYear).toHaveBeenCalledWith(mockYear)
    })

    it('dayEvents() sets selectedDate and calls onSelect', async () => {
        const { panel, state, input } = setup()

        panel.onSelect = mockSelect
        panel.open(input)

        const firstDayDiv =
            panel.element.querySelector<HTMLDivElement>(
                '[data-day][data-outside="0"]'
            )

        await userEvent.click(firstDayDiv!)

        expect(state.selectedDate?.getDate()).toBe(
            Number(firstDayDiv!.dataset.day)
        )
        expect(mockSelect).toHaveBeenNthCalledWith(
            1,
            state.selectedDate
        )
    })
})
