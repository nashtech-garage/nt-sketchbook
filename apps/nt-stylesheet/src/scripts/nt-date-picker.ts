import { Singleton } from '../utils/singleton'

export class NtDatePicker extends Singleton {
    private inputs: HTMLInputElement[] = []
    private panel: HTMLDivElement
    private activeInput: HTMLInputElement | null = null

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

        this.panel.style.left = rect.left + window.scrollX + 'px'
        this.panel.style.top = rect.bottom + window.scrollY + 'px'
        this.panel.style.display = 'block'

        this.render()
    }

    private close() {
        this.panel.style.display = 'none'
        this.activeInput = null
    }

    private render() {
        const firstDay = new Date(
            this.currentYear,
            this.currentMonth,
            1
        ).getDay()

        const daysInMonth = new Date(
            this.currentYear,
            this.currentMonth + 1,
            0
        ).getDate()

        const cells: string[] = []
        const today = new Date()

        for (let i = 0; i < firstDay; i++) {
            cells.push(
                `<div class="react-datepicker__day react-datepicker__day--outside-month"></div>`
            )
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(
                this.currentYear,
                this.currentMonth,
                d
            )
            const dayOfWeek = date.getDay()

            const dayIndex = String(d).padStart(3, '0')

            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const isToday =
                date.toDateString() === today.toDateString()

            const classes = [
                'react-datepicker__day',
                `react-datepicker__day--${dayIndex}`
            ]

            if (isWeekend)
                classes.push('react-datepicker__day--weekend')
            if (isToday) classes.push('react-datepicker__day--today')

            const ariaLabel = `Choose ${date.toLocaleDateString(
                'en-US',
                {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }
            )}`

            cells.push(`
                <div
                    class="${classes.join(' ')}"
                    tabindex="${isToday ? 0 : -1}"
                    aria-label="${ariaLabel}"
                    role="gridcell"
                    aria-disabled="false"
                    aria-selected="${isToday}"
                    data-day="${d}"
                >
                    ${d}
                </div>
            `)
        }

        let weeks = ''
        for (let i = 0; i < cells.length; i += 7) {
            weeks += `
                <div class="react-datepicker__week" role="row">
                    ${cells.slice(i, i + 7).join('')}
                </div>
            `
        }

        this.panel.innerHTML = `
            <div class="react-datepicker">
                <div class="react-datepicker__month-container">
                    <div class="react-datepicker__header react-datepicker__header--custom">
                        <div class="nt-datepicker-header">
                            <button data-prev>
                                <span class="nti nti-chevron-left"></span>
                            </button>
                            <span>${this.currentMonth + 1}/${
                                this.currentYear
                            }</span>
                            <button data-next>
                                <span class="nti nti-chevron-right"></span>
                            </button>
                        </div>
                    </div>
                    <div class="table">
                        <div class="rowgroup">
                            <div class="react-datepicker__day-names">
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Sunday</span>
                                    <span aria-hidden="true">Sun</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Monday</span>
                                    <span aria-hidden="true">Mon</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Tuesday</span>
                                    <span aria-hidden="true">Tue</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Wednesday</span>
                                    <span aria-hidden="true">Wed</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Thursday</span>
                                    <span aria-hidden="true">Thu</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Friday</span>
                                    <span aria-hidden="true">Fri</span>
                                </div>
                                <div role="columnheader" class="react-datepicker__day-name">
                                    <span class="react-datepicker__sr-only">Saturday</span>
                                    <span aria-hidden="true">Sat</span>
                                </div>
                            </div>
                        </div>
                        <div class="react-datepicker__month">
                            ${weeks}
                        </div>
                    </div>
                </div>
            </div>
        `

        this.attachEvents()
    }

    private attachEvents() {
        this.panel
            .querySelector('[data-prev]')
            ?.addEventListener('click', () => {
                this.currentMonth--

                if (this.currentMonth < 0) {
                    this.currentMonth = 11
                    this.currentYear--
                }

                this.render()
            })

        this.panel
            .querySelector('[data-next]')
            ?.addEventListener('click', () => {
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
                el.addEventListener('click', () => {
                    if (!this.activeInput) return

                    const day = Number(el.dataset.day)

                    const date = new Date(
                        this.currentYear,
                        this.currentMonth,
                        day
                    )

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
