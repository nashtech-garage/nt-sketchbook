import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtDropdown } from './nt-dropdown'

const dataToggle = '[data-nt-toggle="dropdown"]'

const setup = (
    html: string = `
    <div class="nt-dropdown">
        <button data-nt-toggle="dropdown" aria-expanded="false">Toggle</button>
        <div class="nt-dropdown-menu">Menu</div>
    </div>
`
) => {
    document.body.innerHTML = html
    NtDropdown.init()
}

const getTrigger = () =>
    document.querySelector(dataToggle) as HTMLElement

const getParent = (trigger: HTMLElement) =>
    trigger.closest('.nt-dropdown') as HTMLElement

describe('NtDropdown', () => {
    beforeEach(() => {
        setup()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should initialize without error', () => {
        expect(() => NtDropdown.init()).not.toThrow()
    })

    it('should open dropdown when trigger is clicked', () => {
        const trigger = getTrigger()
        trigger.click()

        const parent = getParent(trigger)

        expect(parent.classList.contains('is-open')).toBe(true)
        expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('should close dropdown when clicking outside', () => {
        setup()
        const trigger = getTrigger()
        trigger.click()

        document.body.click()

        const parent = getParent(trigger)
        expect(parent.classList.contains('is-open')).toBe(false)
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('should close other dropdowns when a new one opens', () => {
        setup(`
            <div class="nt-dropdown">
                <button data-nt-toggle="dropdown" aria-expanded="false">First</button>
                <div class="nt-dropdown-menu">First Menu</div>
            </div>
            <div class="nt-dropdown">
                <button data-nt-toggle="dropdown" aria-expanded="false">Second</button>
                <div class="nt-dropdown-menu">Second Menu</div>
            </div>
        `)

        const triggers = document.querySelectorAll(dataToggle)
        const firstTrigger = triggers[0] as HTMLElement
        const secondTrigger = triggers[1] as HTMLElement

        firstTrigger.click()
        expect(
            getParent(firstTrigger).classList.contains('is-open')
        ).toBe(true)

        secondTrigger.click()
        expect(
            getParent(firstTrigger).classList.contains('is-open')
        ).toBe(false)
        expect(
            getParent(secondTrigger).classList.contains('is-open')
        ).toBe(true)
    })

    it('should respect placement attribute', () => {
        const trigger = getTrigger()
        trigger.setAttribute('data-nt-placement', 'up')

        trigger.click()

        const parent = getParent(trigger)
        expect(parent.classList.contains('is-up')).toBe(true)
    })
})
