export class NtModal {
    static init() {
        document.addEventListener('click', (event) => {
            const target = event.target
            const trigger = (target as HTMLElement).closest(
                '[data-nt-toggle="modal"]'
            )

            if (trigger) {
                this.handleOpenModal(
                    document.querySelector(
                        trigger.getAttribute('data-nt-target')!
                    )
                )
            }

            const dismissBtn = (target as HTMLElement).closest(
                '[data-nt-dismiss="modal"]'
            )

            if (dismissBtn) {
                const modal = dismissBtn.closest('.nt-modal')
                this.handleCloseModal(modal)
            }

            const openModal = (target as HTMLElement).closest(
                '.nt-modal.show'
            )
            if (openModal && target === openModal) {
                this.handleCloseModal(openModal)
            }
        })

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const modal = document.querySelector('.nt-modal.show')
                if (modal) this.handleCloseModal(modal)
            }
        })
    }

    static handleOpenModal(modal: Element | null) {
        if (!modal) return

        modal.classList.add('show')
        modal.classList.remove('fade')
        modal.classList.remove('hidden')
        ;(modal as HTMLElement).style.display = 'block'
        document.body.classList.add('nt-modal-open')

        return
    }

    static handleCloseModal(modal: Element | null) {
        if (!modal) return

        modal.classList.remove('show')
        modal.classList.add('fade')
        document.body.classList.remove('nt-modal-open')
        modal.classList.add('hidden')
        ;(modal as HTMLElement).style.removeProperty('display')
        return
    }
}
