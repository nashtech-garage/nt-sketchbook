import { Singleton } from '../utils/singleton'

export class NtToggleMenu extends Singleton {
    private readonly menuSelector: string
    private readonly overlaySelector: string
    private menuElement: HTMLElement | null = null
    private overlayElement: HTMLElement | null = null
    private sideMenuToggleElement: HTMLElement | null = null

    constructor(
        menuSelector = '.nt-side-menu',
        overlaySelector = '.nt-main-page-overlay'
    ) {
        super()
        this.menuSelector = menuSelector
        this.overlaySelector = overlaySelector
        // Cache DOM elements
        this.menuElement = document.querySelector<HTMLElement>(
            this.menuSelector
        )
        this.overlayElement = document.querySelector<HTMLElement>(
            this.overlaySelector
        )
        this.sideMenuToggleElement =
            document.querySelector<HTMLElement>(
                `${this.menuSelector}-toggle`
            )
    }

    public toggle(el: HTMLElement): void {
        const targetSelector = el.getAttribute('data-toggle-menu')
        if (!targetSelector) return

        const target =
            document.querySelector<HTMLElement>(targetSelector)

        if (!target) {
            return
        }

        this.menuElement?.classList.toggle('active')
        target.classList.toggle('menu-active')
        this.toggleOverlay()
    }

    public close(): void {
        this.menuElement?.classList.remove('active')
        this.overlayElement?.classList.remove('active')
    }

    public bind(): void {
        const togglers = document.querySelector<HTMLElement>(
            '[data-toggle-menu]'
        )

        if (togglers) {
            togglers?.addEventListener('click', () =>
                this.toggle(togglers)
            )

            const targetSelector = togglers.getAttribute(
                'data-toggle-menu'
            )

            if (targetSelector) {
                const target =
                    document.querySelector<HTMLElement>(
                        targetSelector
                    )

                this.sideMenuToggleElement?.addEventListener(
                    'click',
                    () => {
                        target?.classList?.toggle('active')
                        this.menuElement?.classList.toggle('active')
                        this.overlayElement?.classList.toggle(
                            'active'
                        )
                    }
                )

                this.overlayElement?.addEventListener('click', () =>
                    this.close()
                )
            }
        }
    }

    private toggleOverlay(): void {
        this.overlayElement?.classList.toggle('active')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ntToggle = new NtToggleMenu()
    ntToggle.bind()
})
