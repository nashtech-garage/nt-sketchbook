import { NtDatePickerRenderer } from './nt-date-picker-renderer'
import type { NtDatePickerState } from './nt-date-picker-state'

export interface DatePickerPanel {
    onSelect?: (date: Date) => void
}

export class NtDatePickerPanel implements DatePickerPanel {
    onSelect?: (date: Date) => void
    private panel: HTMLDivElement
    private renderer = new NtDatePickerRenderer()

    constructor(private state: NtDatePickerState) {
        this.panel = document.createElement('div')
        this.panel.className =
            'react-datepicker-popper react-datepicker-popper-offset nt-datepicker-popper'
        this.panel.style.position = 'absolute'
        this.panel.style.display = 'none'
        this.panel.role = 'group'

        document.body.appendChild(this.panel)
    }

    open(input: HTMLInputElement) {
        const rect = input.getBoundingClientRect()

        const panelWidth = this.panel.offsetWidth
        const left = rect.left + rect.width / 2 - panelWidth / 2

        Object.assign(this.panel.style, {
            left: `${left}px`,
            top: `${rect.bottom}px`,
            display: 'block'
        })

        this.render()
        this.bindEvents()
    }

    close() {
        this.panel.style.display = 'none'
    }

    render() {
        this.panel.innerHTML = this.renderer.render(this.state)
    }

    get element() {
        return this.panel
    }

    private bindEvents() {
        this.prevEvent()
        this.nextEvent()
        this.dayEvents()
        this.monthEvent()
        this.yearEvent()
    }

    private prevEvent() {
        this.panel
            .querySelector('[data-prev]')
            ?.addEventListener('click', (e) => {
                e.stopPropagation()

                this.state.prevMonth()
                this.render()
                this.bindEvents()
            })
    }

    private nextEvent() {
        this.panel
            .querySelector('[data-next]')
            ?.addEventListener('click', (e) => {
                e.stopPropagation()

                this.state.nextMonth()
                this.render()
                this.bindEvents()
            })
    }

    private monthEvent() {
        this.panel
            .querySelector<HTMLSelectElement>('[data-month]')
            ?.addEventListener('change', (e) => {
                const value = Number(
                    (e.target as HTMLSelectElement).value
                )

                this.state.setMonth(value)
                this.render()
                this.bindEvents()
            })
    }

    private yearEvent() {
        this.panel
            .querySelector<HTMLSelectElement>('[data-year]')
            ?.addEventListener('change', (e) => {
                const value = Number(
                    (e.target as HTMLSelectElement).value
                )

                this.state.setYear(value)
                this.render()
                this.bindEvents()
            })
    }

    private dayEvents() {
        this.panel
            .querySelectorAll<HTMLDivElement>('[data-day]')
            .forEach((el) => {
                el.addEventListener('click', () => {
                    const day = Number(el.dataset.day)
                    const outside = Number(el.dataset.outside)

                    const date = new Date(
                        this.state.currentYear,
                        this.state.currentMonth + outside,
                        day
                    )

                    this.state.selectedDate = date

                    this.onSelect?.(date)
                    this.close()
                })
            })
    }
}
