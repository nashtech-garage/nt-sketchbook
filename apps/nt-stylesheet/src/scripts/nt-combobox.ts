import { Singleton } from '../utils/singleton'

export class NtCombobox extends Singleton {
    private popoverEl: HTMLDivElement | null = null
    private selectedValue: string | null = null
    private boundHandleClick: (e: MouseEvent) => void
    private boundHandleEscape: (e: KeyboardEvent) => void

    constructor() {
        super()
        // Cache bound handlers for proper cleanup
        this.boundHandleClick = this.handleClick.bind(this)
        this.boundHandleEscape = this.handleEscape.bind(this)

        document.addEventListener('click', this.boundHandleClick)
        document.addEventListener('keydown', this.boundHandleEscape)
    }

    public destroy(): void {
        // Clean up event listeners to prevent memory leaks
        document.removeEventListener('click', this.boundHandleClick)
        document.removeEventListener(
            'keydown',
            this.boundHandleEscape
        )
        this.removePopover()
    }

    private handleClick(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest(
            '[data-combobox]'
        ) as HTMLElement
        const isInsidePopover = (e.target as HTMLElement).closest(
            '.nt-combobox-popover'
        )
        const isOptionClick = (e.target as HTMLElement).closest(
            '.nt-combobox-list-item'
        )

        if (isOptionClick) {
            this.selectOption(isOptionClick as HTMLElement)
            return
        }

        if (!target && !isInsidePopover) {
            this.removePopover()
            return
        }

        if (!target) return

        if (this.popoverEl) {
            this.removePopover()
            return
        }

        const options =
            target.getAttribute('data-options')?.split(',') || []
        this.createPopover(target, options)
    }

    private handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') this.removePopover()
    }

    private createPopover(trigger: HTMLElement, options: string[]) {
        this.popoverEl = document.createElement('div')
        this.popoverEl.className = 'nt-combobox-popover show'
        this.popoverEl.style.position = 'absolute'

        const input = document.createElement('input')
        input.className = 'nt-combobox-input'
        input.type = 'text'
        input.placeholder = 'Search options...'
        input.addEventListener('keyup', () => this.filterOptions())

        const list = document.createElement('div')
        list.className = 'nt-combobox-list'

        this.renderListItem(
            list,
            options.map((opt) => opt.trim())
        )

        this.popoverEl.appendChild(input)
        this.popoverEl.appendChild(list)
        document.body.appendChild(this.popoverEl)
        this.positionPopover(trigger)
        input.focus()
    }

    private renderListItem(
        listSelector: HTMLElement,
        options: string[]
    ) {
        if (options.length === 0) {
            const noResults = document.createElement('div')
            noResults.className = 'no-results'
            noResults.setAttribute('role', 'option')
            noResults.textContent = 'No results found'
            listSelector.appendChild(noResults)
            return
        }

        options.forEach((option) => {
            const button = document.createElement('button')
            button.className = 'nt-combobox-list-item'
            button.setAttribute('role', 'option')
            button.setAttribute('data-value', option)
            button.setAttribute('tabindex', '-1')
            button.textContent = option

            if (option === this.selectedValue) {
                button.classList.add('selected-item')
            }

            listSelector.appendChild(button)
        })
    }

    private selectOption(option: HTMLElement) {
        const trigger = document.querySelector(
            '[data-combobox] .nt-combobox-trigger'
        ) as HTMLButtonElement
        if (trigger) trigger.textContent = option.textContent

        this.selectedValue = option.textContent

        const items = this.popoverEl?.querySelectorAll(
            '.nt-combobox-list-item'
        ) as NodeListOf<HTMLElement>
        items?.forEach((item) => {
            if (item === option) {
                item.classList.add('selected-item')
            } else {
                item.classList.remove('selected-item')
            }
        })

        this.removePopover()
    }

    private filterOptions() {
        const input = this.popoverEl?.querySelector(
            '.nt-combobox-input'
        ) as HTMLInputElement
        const items = this.popoverEl?.querySelectorAll(
            '.nt-combobox-list-item'
        ) as NodeListOf<HTMLElement>
        const filter = input?.value.toLowerCase() || ''
        let hasVisibleItems = false

        items?.forEach((item) => {
            const text = item.textContent?.toLowerCase() || ''
            const isVisible = text.includes(filter)
            item.style.display = isVisible ? '' : 'none'
            if (isVisible) hasVisibleItems = true
        })

        let noResultsMsg = this.popoverEl?.querySelector(
            '.no-results'
        ) as HTMLElement
        if (!hasVisibleItems && filter !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div')
                noResultsMsg.className = 'no-results'
                noResultsMsg.textContent = 'No results found'
                this.popoverEl?.appendChild(noResultsMsg)
            }
            noResultsMsg.style.display = 'block'
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none'
        }
    }

    private positionPopover(trigger: HTMLElement) {
        if (!this.popoverEl) return
        const rect = trigger.getBoundingClientRect()
        this.popoverEl.style.top = `${
            rect.bottom + window.scrollY + 4
        }px`
        this.popoverEl.style.left = `${rect.left + window.scrollX}px`
        this.popoverEl.style.minWidth = `${rect.width}px`
    }

    private removePopover() {
        if (this.popoverEl) {
            this.popoverEl.remove()
            this.popoverEl = null
        }
    }
}
