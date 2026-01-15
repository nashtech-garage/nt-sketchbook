import { Singleton } from '../utils/singleton'

export class NtCollapse extends Singleton {
    private static readonly showClass = 'show'

    constructor() {
        super()
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () =>
                NtCollapse.bind()
            )
        } else {
            NtCollapse.bind()
        }
    }

    private static bind(): void {
        document.addEventListener('click', (event) => {
            const trigger = (event.target as HTMLElement)?.closest(
                '[data-nt-collapse]'
            )
            if (!trigger) return

            event.preventDefault()
            NtCollapse.toggle(trigger as HTMLElement)
        })
    }

    private static toggle(trigger: HTMLElement): void {
        const targetSelector = trigger.getAttribute(
            'data-nt-collapse'
        )
        if (!targetSelector) return

        const target =
            document.querySelector<HTMLElement>(targetSelector)
        if (!target) return

        const isExpanded = target.classList.contains(
            NtCollapse.showClass
        )

        const finishTransition = () => {
            if (target.classList.contains(NtCollapse.showClass)) {
                target.style.height = 'auto'
            } else {
                target.style.display = 'none'
                target.style.height = ''
            }

            target.removeEventListener(
                'transitionend',
                finishTransition
            )
        }

        target.removeEventListener('transitionend', finishTransition)
        target.addEventListener('transitionend', finishTransition)

        if (isExpanded) {
            const height = target.scrollHeight
            target.style.height = `${height}px`

            requestAnimationFrame(() => {
                target.style.height = '0'
                target.classList.remove(NtCollapse.showClass)
            })
        } else {
            target.style.display = 'block'
            const height = target.scrollHeight
            target.style.height = '0px'
            target.classList.add(NtCollapse.showClass)

            requestAnimationFrame(() => {
                target.style.height = `${height}px`
            })
        }

        trigger.setAttribute('aria-expanded', String(!isExpanded))
    }
}
