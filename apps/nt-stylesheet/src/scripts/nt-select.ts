export class NtSelect {
    static init() {
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement
            const trigger = target.closest(
                '[data-nt-toggle="select"]'
            ) as HTMLButtonElement

            if (trigger) {
                this.handleOpenSelect(trigger)
            }
        })
    }

    static handleOpenSelect(element: HTMLButtonElement) {
        const attributeName = 'aria-expanded'
        if (element.getAttribute(attributeName) === 'true') {
            element.setAttribute(attributeName, 'false')
        } else {
            element.setAttribute(attributeName, 'true')
        }
    }
}
