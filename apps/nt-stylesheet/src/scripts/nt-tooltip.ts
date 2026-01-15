import DOMPurify from 'dompurify'

import {
    applyPosition,
    type Placement,
    positionElement
} from '../utils/positioning'
import { Singleton } from '../utils/singleton'

export type { Placement }

export type Variant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'

export class NtTooltip extends Singleton {
    private tooltipEl: HTMLDivElement | null = null

    constructor() {
        super()
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
        const position = positionElement(trigger, tooltip, placement)
        applyPosition(tooltip, position)
    }
}
