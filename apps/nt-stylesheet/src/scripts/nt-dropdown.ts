import { Singleton } from '../utils/singleton'

export class NtDropdown extends Singleton {
    private static readonly openClass = 'is-open'

    constructor() {
        super()
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () =>
                NtDropdown.bind()
            )
        } else {
            NtDropdown.bind()
        }
    }

    private static bind(): void {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement

            const trigger = target.closest(
                '[data-nt-toggle="dropdown"]'
            ) as HTMLElement | null

            const dropdown = target.closest(
                '.nt-dropdown'
            ) as HTMLElement | null

            if (!dropdown || !trigger) {
                this.closeAll()
            }

            if (trigger) {
                event.preventDefault()
                this.toggle(trigger)
            }
        })
    }

    private static toggle(trigger: HTMLElement): void {
        const parent = trigger.closest<HTMLElement>('.nt-dropdown')
        if (!parent) return

        const isOpen = parent.classList.contains(this.openClass)
        const placement =
            trigger.getAttribute('data-nt-placement') || 'down'

        parent.classList.remove(
            'is-up',
            'is-down',
            'is-left',
            'is-right'
        )

        this.closeAll()

        if (!isOpen) {
            parent.classList.add(this.openClass)
            parent.classList.add(`is-${placement}`)
            trigger.setAttribute('aria-expanded', 'true')
        }
    }

    private static closeAll(): void {
        const allDropdowns =
            document.querySelectorAll<HTMLElement>('.nt-dropdown')
        const allTriggers = document.querySelectorAll<HTMLElement>(
            '[data-nt-toggle="dropdown"]'
        )

        allDropdowns.forEach((d) =>
            d.classList.remove(
                this.openClass,
                'is-up',
                'is-down',
                'is-left',
                'is-right'
            )
        )
        allTriggers.forEach((btn) =>
            btn.setAttribute('aria-expanded', 'false')
        )
    }
}
