import { format } from 'date-fns'
import { Singleton } from '../../utils/singleton'
import { NtDatePickerPanel } from './nt-date-picker-panel'
import { NtDatePickerState } from './nt-date-picker-state'

export const DEFAULT_FORMAT = 'dd/MM/yyyy'

export class NtDatePicker extends Singleton {
    private state = new NtDatePickerState()
    private panel = new NtDatePickerPanel(this.state)

    private activeInput: HTMLInputElement | null = null

    constructor() {
        super()

        this.initInputs()
        this.bindGlobalEvents()
        this.bindPanelEvents()
    }

    private initInputs() {
        document.addEventListener('focusin', (event) => {
            const input = (event.target as HTMLElement).closest(
                '[data-nt-datepicker]'
            ) as HTMLInputElement | null

            if (!input) return

            this.activeInput = input

            this.panel.open(input)
        })
    }

    private bindPanelEvents() {
        this.panel.onSelect = (date: Date) => {
            this.handleSelect(date)
        }
    }

    private handleSelect(date: Date) {
        if (!this.activeInput) return

        const formatStr =
            this.activeInput.dataset.format || DEFAULT_FORMAT

        this.activeInput.value = format(date, formatStr)
        this.panel.close()
        this.activeInput = null
    }

    private bindGlobalEvents() {
        document.addEventListener('click', (e) => {
            const target = e.target as Node

            if (
                !this.panel.element.contains(target) &&
                target !== this.activeInput
            ) {
                this.panel.close()
                this.activeInput = null
            }
        })
    }
}
