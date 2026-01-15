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
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'

export class NtPopover extends Singleton {
    private popoverEl: HTMLDivElement | null = null

    constructor() {
        super()
        document.addEventListener(
            'click',
            this.handleClick.bind(this)
        )
        window.addEventListener(
            'scroll',
            this.removePopover.bind(this),
            true
        )
        window.addEventListener(
            'resize',
            this.removePopover.bind(this),
            true
        )
        document.addEventListener(
            'keydown',
            this.handleEscape.bind(this)
        )
    }

    private handleClick(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest(
            '[data-nt-toggle="popover"]'
        ) as HTMLElement | null
        const isInsidePopover = (e.target as HTMLElement).closest(
            '.nt-popover'
        )

        if (!target && !isInsidePopover) {
            this.removePopover()
            return
        }

        if (!target) return

        if (this.popoverEl) {
            this.removePopover()
            return
        }

        const content = target.getAttribute('data-nt-content')
        const placement = (target.getAttribute('data-nt-placement') ||
            'top') as Placement
        const allowHtml =
            target.getAttribute('data-nt-html') === 'true'
        const variant = (target.getAttribute('data-nt-variant') ||
            'default') as Variant
        const dismissible =
            target.getAttribute('data-nt-dismissible') === 'true'
        const title = target.getAttribute('data-nt-title')

        if (!content) return

        this.popoverEl = this.createPopover(
            content,
            allowHtml,
            placement,
            variant,
            dismissible,
            title!
        )
        document.body.appendChild(this.popoverEl)
        this.positionPopover(target, this.popoverEl, placement)
    }

    private handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') this.removePopover()
    }

    private removePopover() {
        if (this.popoverEl) {
            this.popoverEl.remove()
            this.popoverEl = null
        }
    }

    private createPopover(
        content: string,
        isHtml: boolean,
        placement: Placement,
        variant: Variant,
        dismissible: boolean,
        title: string
    ): HTMLDivElement {
        const popover = document.createElement('div')
        popover.className = `nt-popover show nt-popover-${variant} ${placement}`
        popover.setAttribute('role', 'tooltip')
        popover.setAttribute('data-nt-placement', placement)
        popover.style.position = 'absolute'

        const arrow = document.createElement('div')
        arrow.className = 'nt-popover-arrow'
        popover.appendChild(arrow)

        const body = document.createElement('div')
        body.className = 'nt-popover-body'

        if (dismissible) {
            const closeBtn = document.createElement('button')
            closeBtn.className = 'nt-popover-close'
            closeBtn.setAttribute('type', 'button')
            closeBtn.setAttribute('aria-label', 'Close')
            closeBtn.innerHTML = '&times;'
            closeBtn.addEventListener(
                'click',
                this.removePopover.bind(this)
            )
            body.appendChild(closeBtn)
        }

        if (title) {
            const titleEl = document.createElement('div')
            titleEl.className = 'nt-popover-title'
            titleEl.textContent = title
            body.appendChild(titleEl)
        }

        const contentEl = document.createElement('div')
        if (isHtml) {
            contentEl.innerHTML = DOMPurify.sanitize(content)
        } else {
            contentEl.textContent = content
        }

        body.appendChild(contentEl)
        popover.appendChild(body)
        return popover
    }

    private positionPopover(
        trigger: HTMLElement,
        popover: HTMLElement,
        placement: Placement
    ) {
        const position = positionElement(trigger, popover, placement)
        applyPosition(popover, position)
    }
}
