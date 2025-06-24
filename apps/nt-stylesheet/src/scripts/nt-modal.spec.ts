import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtModal } from './nt-modal'

let modal: HTMLElement
let dismissBtn: HTMLElement
let button: HTMLElement

const setup = () => {
    document.body.innerHTML = `
        <button data-nt-toggle="modal" id="button" data-nt-target="#testModal">Open</button>
        <div id="testModal" class="nt-modal hidden">
            <div class="nt-modal-box">
                <span data-nt-dismiss="modal">&times;</span>
            </div>
        </div>
    `
    button = document.getElementById('button')!
    modal = document.getElementById('testModal')!
    dismissBtn = document.querySelector('[data-nt-dismiss="modal"]')!
}

describe('NtModal', () => {
    beforeEach(() => {
        setup()
        NtModal.init()
    })

    afterEach(() => {
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('should open modal when trigger is clicked', () => {
        button.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        )

        expect(modal.classList.contains('show')).toBe(true)
        expect(modal.classList.contains('fade')).toBe(false)
        expect(modal.classList.contains('hide')).toBe(false)
        expect((modal as HTMLElement).style.display).toBe('block')
        expect(document.body.classList.contains('modal-open')).toBe(
            true
        )

        const backdrop = document.querySelector('.nt-modal-backdrop')
        expect(backdrop).not.toBeNull()
        expect(backdrop?.classList.contains('show')).toBe(true)
    })

    it.each([
        {
            name: 'clicking dismiss button',
            action: () => {
                dismissBtn.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                )
            }
        },
        {
            name: 'pressing Escape key',
            action: () => {
                document.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'Escape',
                        bubbles: true
                    })
                )
            }
        },
        {
            name: 'clicking outside the modal box',
            action: () => {
                modal.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                )
            }
        }
    ])('should close modal when $name', ({ action }) => {
        NtModal.handleOpenModal(modal)
        action()

        expect(modal.classList.contains('hidden')).toBe(true)
        expect(modal.style.display).toBe('')
        expect(
            document.querySelector('.nt-modal-backdrop')
        ).toBeNull()
    })
})
