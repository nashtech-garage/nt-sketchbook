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
        this.panel.className = 'nt-datepicker-panel'
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

        console.log('Datepicker inputs:', this.inputs)

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

        let days = ''

        for (let i = 0; i < firstDay; i++) {
            days += `<div class="nt-day empty"></div>`
        }

        for (let d = 1; d <= daysInMonth; d++) {
            days += `<div class="nt-day" data-day="${d}">${d}</div>`
        }

        this.panel.innerHTML = `
            <div class="nt-datepicker-header">
                <button data-prev>&lt;</button>
                <span>${this.currentMonth + 1}/${
                    this.currentYear
                }</span>
                <button data-next>&gt;</button>
            </div>

            <div class="nt-datepicker-grid">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
                ${days}
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
