export class NtToggleMenu {
    private readonly menuSelector: string
    private readonly overlaySelector: string

    constructor(
        menuSelector = '.nt-side-menu',
        overlaySelector = '.nt-main-page-overlay',
    ) {
        this.menuSelector = menuSelector
        this.overlaySelector = overlaySelector
    }

    public toggle(el: HTMLElement): void {
        const targetSelector = el.getAttribute('data-toggle-menu')
        if (!targetSelector) return

        const target =
            document.querySelector<HTMLElement>(targetSelector)
        const menu = document.querySelector<HTMLElement>(
            this.menuSelector,
        )

        if (!target) {
            return
        }

        menu?.classList.toggle('active')
        target.classList.toggle('menu-active')
        this.toggleOverlay()
    }

    public close(): void {
        const menu = document.querySelector<HTMLElement>(
            this.menuSelector,
        )
        const overlay = document.querySelector<HTMLElement>(
            this.overlaySelector,
        )
        menu?.classList.remove('active')
        overlay?.classList.remove('active')
    }

    public bind(): void {
        const togglers = document.querySelector<HTMLElement>(
            '[data-toggle-menu]',
        )

        if (togglers) {
            togglers?.addEventListener('click', () =>
                this.toggle(togglers),
            )

            const targetSelector = togglers.getAttribute(
                'data-toggle-menu',
            )

            if (targetSelector) {
                const target =
                    document.querySelector<HTMLElement>(
                        targetSelector,
                    )
                const sideMenuToggle =
                    document.querySelector<HTMLElement>(
                        `${this.menuSelector}-toggle`,
                    )

                sideMenuToggle?.addEventListener('click', () => {
                    const menu = document.querySelector<HTMLElement>(
                        this.menuSelector,
                    )
                    const overlay =
                        document.querySelector<HTMLElement>(
                            this.overlaySelector,
                        )

                    target?.classList?.toggle('active')
                    menu?.classList.toggle('active')
                    overlay?.classList.toggle('active')
                })

                const overlay = document.querySelector<HTMLElement>(
                    this.overlaySelector,
                )
                overlay?.addEventListener('click', () => this.close())
            }
        }
    }

    private toggleOverlay(): void {
        const overlay = document.querySelector<HTMLElement>(
            this.overlaySelector,
        )
        overlay?.classList.toggle('active')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ntToggle = new NtToggleMenu()
    ntToggle.bind()
})
