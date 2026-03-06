import { Singleton } from '../utils/singleton'

type DayClassOptions = {
    dayIndex: string
    isSelectedDate: boolean
    isToday: boolean
    isWeekend: boolean
    isOutsideMonth?: boolean
}

type CellOptions = {
    date: Date
    day: number
    outsideMonth: -1 | 0 | 1
    isToday?: boolean
}

export class NtDatePicker extends Singleton {
    private inputs: HTMLInputElement[] = []
    private panel: HTMLDivElement
    private activeInput: HTMLInputElement | null = null
    private selectedDate: Date | null = null

    private currentMonth = new Date().getMonth()
    private currentYear = new Date().getFullYear()

    constructor() {
        super()

        this.panel = document.createElement('div')
        this.panel.className =
            'react-datepicker-popper react-datepicker-popper-offset nt-datepicker-popper'
        this.panel.style.position = 'absolute'
        this.panel.style.display = 'none'

        document.body.appendChild(this.panel)

        this.initInputs()
        this.bindGlobalEvents()
    }

    private initInputs() {
        this.inputs = Array.from(
            document.querySelectorAll<HTMLInputElement>(
                '[data-nt-datepicker]'
            )
        )

        document.addEventListener('focusin', (event) => {
            const input = (event.target as HTMLElement).closest(
                '[data-nt-datepicker]'
            ) as HTMLInputElement | null

            if (!input) return

            this.activeInput = input
            this.open(input)
        })
    }

    private bindGlobalEvents() {
        document.addEventListener('click', (e) => {
            if (
                !this.panel.contains(e.target as Node) &&
                e.target !== this.activeInput
            ) {
                this.close()
            }
        })
    }

    private open(input: HTMLInputElement) {
        const rect = input.getBoundingClientRect()

        this.panel.style.left =
            rect.left + rect.width / 2 + window.scrollX + 'px'
        this.panel.style.top = rect.bottom + window.scrollY + 'px'
        this.panel.style.transform = 'translateX(-50%)'
        this.panel.style.display = 'block'

        this.render()
    }

    private close() {
        this.panel.style.display = 'none'
        this.activeInput = null
    }

    private render(): void {
        const cells = this.generateCalendarCells()
        const weeks = this.generateWeeks(cells)
        const dayHeaders = this.generateDayHeaders()

        this.renderTemplate(weeks, dayHeaders)
        this.attachEvents()
    }

    private generateCalendarCells(): string[] {
        const cells: string[] = []

        // Previous month days
        cells.push(...this.generatePreviousMonthDays())

        // Current month days
        cells.push(...this.generateCurrentMonthDays())

        // Next month days
        cells.push(...this.generateNextMonthDays(cells.length))

        return cells
    }

    private generatePreviousMonthDays(): string[] {
        const cells: string[] = []
        const firstDay = this.getFirstDayOfMonth()
        const prevMonthDays = this.getDaysInMonth(
            this.currentMonth - 1
        )

        for (let i = firstDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i
            const date = new Date(
                this.currentYear,
                this.currentMonth - 1,
                day
            )
            cells.push(
                this.createDayCell({
                    day,
                    date,
                    outsideMonth: -1
                })
            )
        }

        return cells
    }

    private generateCurrentMonthDays(): string[] {
        const cells: string[] = []
        const daysInMonth = this.getDaysInMonth(this.currentMonth)
        const today = new Date()

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(
                this.currentYear,
                this.currentMonth,
                d
            )
            const isToday = this.isToday(date, today)
            cells.push(
                this.createDayCell({
                    day: d,
                    date,
                    outsideMonth: 0,
                    isToday
                })
            )
        }

        return cells
    }

    private generateNextMonthDays(currentLength: number): string[] {
        const cells: string[] = []
        const remainder = currentLength % 7

        if (remainder === 0) return cells

        const nextDays = 7 - remainder

        for (let i = 1; i <= nextDays; i++) {
            const date = new Date(
                this.currentYear,
                this.currentMonth + 1,
                i
            )
            cells.push(
                this.createDayCell({
                    day: i,
                    date,
                    outsideMonth: 1
                })
            )
        }

        return cells
    }

    private createDayCell({
        day,
        date,
        outsideMonth,
        isToday
    }: CellOptions): string {
        const dayOfWeek = date.getDay()
        const dayIndex = String(day).padStart(3, '0')
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const isSelected = Boolean(
            this.selectedDate &&
                date.toDateString() ===
                    this.selectedDate.toDateString()
        )

        const classes = this.buildDayClasses({
            dayIndex,
            isWeekend,
            isToday: Boolean(isToday),
            isOutsideMonth: outsideMonth !== 0,
            isSelectedDate: isSelected
        })
        const ariaLabel = this.buildAriaLabel(date)
        const tabindex = isToday ? 0 : -1
        const dataDay = `data-day="${day}"`
        const dataOutside = `data-outside="${outsideMonth}"`

        return `
            <div
                class="${classes.join(' ')}"
                tabindex="${tabindex}"
                aria-label="${ariaLabel}"
                role="gridcell"
                aria-disabled="false"
                aria-selected="${isToday}"
                ${dataDay}
                ${dataOutside}
            >
                ${day}
            </div>
        `
    }

    private buildDayClasses({
        dayIndex,
        isWeekend,
        isToday,
        isOutsideMonth,
        isSelectedDate
    }: DayClassOptions): string[] {
        const classes = [
            'react-datepicker__day',
            `react-datepicker__day--${dayIndex}`
        ]

        if (isWeekend) classes.push('react-datepicker__day--weekend')
        if (isToday) classes.push('react-datepicker__day--today')
        if (isOutsideMonth)
            classes.push(`react-datepicker__day--outside-month`)

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

    private isToday(date: Date, today: Date): boolean {
        return date.toDateString() === today.toDateString()
    }

    private getFirstDayOfMonth(): number {
        return new Date(
            this.currentYear,
            this.currentMonth,
            1
        ).getDay()
    }

    private getDaysInMonth(month: number): number {
        return new Date(this.currentYear, month + 1, 0).getDate()
    }

    private generateWeeks(cells: string[]): string {
        let weeks = ''
        for (let i = 0; i < cells.length; i += 7) {
            weeks += `
                <div class="react-datepicker__week" role="row">
                    ${cells.slice(i, i + 7).join('')}
                </div>
            `
        }
        return weeks
    }

    private generateDayHeaders(): string {
        const formatter = new Intl.DateTimeFormat('en-US', {
            weekday: 'short'
        })

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(2024, 0, 7 + i)
            const label = formatter.format(date)

            return `
                <div role="columnheader" class="react-datepicker__day-name">
                    <span class="react-datepicker__sr-only">${label}</span>
                    <span aria-hidden="true">${label}</span>
                </div>
            `
        }).join('')
    }

    private generateMonthOptions(): string {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short'
        })

        return Array.from({ length: 12 }, (_, i) => {
            const label = formatter.format(new Date(0, i))
            const selected = i === this.currentMonth ? 'selected' : ''

            return `<option value="${i}" ${selected}>${label}</option>`
        }).join('')
    }

    private generateYearOptions(): string {
        const start = 1900
        const end = 2100

        let options = ''

        for (let y = start; y <= end; y++) {
            const selected = y === this.currentYear ? 'selected' : ''

            options += `<option value="${y}" ${selected}>${y}</option>`
        }

        return options
    }

    private renderTemplate(weeks: string, dayHeaders: string): void {
        this.panel.innerHTML = `
            <div class="react-datepicker">
                <div class="react-datepicker__month-container">
                    <div class="react-datepicker__header react-datepicker__header--custom">
                        <div class="nt-datepicker-header">
                            <button data-prev>
                                <span class="nti nti-chevron-left"></span>
                            </button>
                            <select data-month class="nt-select nt-select-default nt-select-medium">
                                ${this.generateMonthOptions()}
                            </select>
                            <select data-year class="nt-select nt-select-default nt-select-medium">
                                ${this.generateYearOptions()}
                            </select>
                            <button data-next>
                                <span class="nti nti-chevron-right"></span>
                            </button>
                        </div>
                    </div>
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

    private attachEvents() {
        this.panel
            .querySelector('[data-prev]')
            ?.addEventListener('click', (e) => {
                e.stopPropagation()
                this.currentMonth--

                if (this.currentMonth < 0) {
                    this.currentMonth = 11
                    this.currentYear--
                }

                this.render()
            })

        this.panel
            .querySelector('[data-next]')
            ?.addEventListener('click', (e) => {
                e.stopPropagation()
                this.currentMonth++

                if (this.currentMonth > 11) {
                    this.currentMonth = 0
                    this.currentYear++
                }

                this.render()
            })

        this.panel
            .querySelectorAll<HTMLDivElement>('[data-day]')
            .forEach((el) => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation()
                    if (!this.activeInput) return

                    const day = Number(el.dataset.day)
                    const outside = Number(el.dataset.outside || 0)

                    let year = this.currentYear
                    let month = this.currentMonth + outside

                    if (month < 0) {
                        month = 11
                        year--
                    }

                    if (month > 11) {
                        month = 0
                        year++
                    }

                    const date = new Date(year, month, day)
                    this.currentMonth = month
                    this.currentYear = year
                    this.selectedDate = date

                    const format =
                        this.activeInput.dataset.format ||
                        'dd/mm/yyyy'

                    this.activeInput.value = this.formatDate(
                        date,
                        format
                    )

                    this.close()
                })
            })

        this.panel
            .querySelector<HTMLSelectElement>('[data-month]')
            ?.addEventListener('change', (e) => {
                const value = Number(
                    (e.target as HTMLSelectElement).value
                )

                this.currentMonth = value
                this.render()
            })

        this.panel
            .querySelector<HTMLSelectElement>('[data-year]')
            ?.addEventListener('change', (e) => {
                const value = Number(
                    (e.target as HTMLSelectElement).value
                )

                this.currentYear = value
                this.render()
            })
    }

    private formatDate(date: Date, format: string) {
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()

        return format
            .replace('dd', dd)
            .replace('mm', mm)
            .replace('yyyy', String(yyyy))
    }
}
