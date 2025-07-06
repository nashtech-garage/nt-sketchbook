import DOMPurify from 'dompurify'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

export type Variant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'

export class NtTooltip {
    private static instance: NtTooltip | undefined
    static getInstance(): NtTooltip {
        if (!this.instance) {
            this.instance = new NtTooltip()
        }
        return this.instance
    }
    static init() {
        this.getInstance()
    }

    private tooltipEl: HTMLDivElement | null = null

    constructor() {
        document.addEventListener(
            'mouseover',
            this.handleHover.bind(this)
        )
        document.addEventListener(
            'mouseout',
            this.handleLeave.bind(this)
        )
    }

    private handleHover(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest(
            '[data-nt-toggle="tooltip"]'
        ) as HTMLElement | null
        if (!target) return

        if (this.tooltipEl) return

        const title =
            target.getAttribute('data-original-title') ||
            target.getAttribute('title')

        if (!title) return

        if (!target.getAttribute('data-original-title')) {
            target.setAttribute('data-original-title', title)
            target.removeAttribute('title')
        }

        const allowHtml =
            target.getAttribute('data-nt-html') === 'true'
        const placement = (target.getAttribute('data-nt-placement') ||
            'top') as Placement
        const variant = (target.getAttribute('data-nt-variant') ||
            'default') as Variant

        this.tooltipEl = this.createTooltip(
            title,
            allowHtml,
            placement,
            variant
        )
        document.body.appendChild(this.tooltipEl)

        this.positionTooltip(target, this.tooltipEl, placement)
    }

    private handleLeave(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest(
            '[data-nt-toggle="tooltip"]'
        )
        if (target && this.tooltipEl) {
            this.tooltipEl.remove()
            this.tooltipEl = null
        }
    }

    private createTooltip(
        content: string,
        isHtml: boolean,
        placement: Placement,
        variant: Variant
    ): HTMLDivElement {
        const tooltip = document.createElement('div')
        tooltip.style.position = 'absolute'
        tooltip.className = `nt-tooltip show nt-tooltip-${variant}`
        tooltip.setAttribute('data-nt-placement', placement)
        tooltip.setAttribute('role', 'tooltip')

        const arrow = document.createElement('div')
        arrow.className = 'arrow'
        tooltip.appendChild(arrow)

        const inner = document.createElement('div')
        inner.className = 'nt-tooltip-inner'
        if (isHtml) {
            inner.innerHTML = DOMPurify.sanitize(content)
        } else {
            inner.textContent = content
        }
        tooltip.appendChild(inner)

        return tooltip
    }

    private positionTooltip(
        trigger: HTMLElement,
        tooltip: HTMLElement,
        placement: Placement
    ) {
        const elRect = trigger.getBoundingClientRect()
        const ttRect = tooltip.getBoundingClientRect()
        const scrollTop = window.scrollY
        const scrollLeft = window.scrollX

        let top = 0,
            left = 0

        switch (placement) {
            case 'top':
                top = elRect.top + scrollTop - ttRect.height - 8
                left =
                    elRect.left +
                    scrollLeft +
                    elRect.width / 2 -
                    ttRect.width / 2
                break
            case 'bottom':
                top = elRect.bottom + scrollTop + 8
                left =
                    elRect.left +
                    scrollLeft +
                    elRect.width / 2 -
                    ttRect.width / 2
                break
            case 'left':
                top =
                    elRect.top +
                    scrollTop +
                    elRect.height / 2 -
                    ttRect.height / 2
                left = elRect.left + scrollLeft - ttRect.width - 8
                break
            case 'right':
                top =
                    elRect.top +
                    scrollTop +
                    elRect.height / 2 -
                    ttRect.height / 2
                left = elRect.right + scrollLeft + 8
                break
        }

        tooltip.style.top = `${top}px`
        tooltip.style.left = `${left}px`
    }
}
