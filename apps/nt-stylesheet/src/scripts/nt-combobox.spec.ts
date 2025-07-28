import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtCombobox } from './nt-combobox'

let trigger: HTMLElement

const setup = () => {
    document.body.innerHTML = `
        <div data-combobox data-options="Apple,Banana,Cherry">
            <button class="nt-combobox-trigger">Select an option</button>
        </div>
    `
    trigger = document.querySelector('.nt-combobox-trigger')!
}

describe('NtCombobox', () => {
    beforeEach(() => {
        setup()
        NtCombobox.init()
    })

    afterEach(() => {
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('should open popover when trigger is clicked', () => {
        trigger.click()
        const popover = document.querySelector('.nt-combobox-popover')
        expect(popover).toBeTruthy()
        expect(
            popover?.querySelectorAll('.nt-combobox-list-item').length
        ).toBe(3)
    })

    it('should initialize as a singleton', () => {
        const instance1 = NtCombobox.getInstance()
        const instance2 = NtCombobox.getInstance()
        expect(instance1).toBe(instance2)
    })

    it('should close popover when clicking outside', () => {
        trigger.click()
        document.body.click()
        const popover = document.querySelector('.nt-combobox-popover')
        expect(popover).toBeFalsy()
    })

    it('should select an option and update trigger text', () => {
        trigger.click()
        const option = document.querySelector(
            '.nt-combobox-list-item'
        ) as HTMLElement
        option.click()
        expect(trigger.textContent).toBe(option.textContent)
    })

    it('should filter options when typing in input', () => {
        trigger.click()
        const input = document.querySelector(
            '.nt-combobox-input'
        ) as HTMLInputElement
        input.value = 'Banana'
        input.dispatchEvent(new KeyboardEvent('keyup'))

        const visibleItems = Array.from(
            document.querySelectorAll('.nt-combobox-list-item')
        ).filter((el) => (el as HTMLElement).style.display !== 'none')

        expect(visibleItems.length).toBe(1)
        expect(visibleItems[0].textContent).toBe('Banana')
    })

    it('should close popover on Escape key press', () => {
        trigger.click()
        document.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Escape' })
        )
        const popover = document.querySelector('.nt-combobox-popover')
        expect(popover).toBeFalsy()
    })

    it('should show "No results found" if no matches', () => {
        trigger.click()
        const input = document.querySelector(
            '.nt-combobox-input'
        ) as HTMLInputElement
        input.value = 'XYZ'

        input.dispatchEvent(new KeyboardEvent('keyup'))

        const noResults = document.querySelector('.no-results')
        expect(noResults).toBeTruthy()
        expect(noResults?.textContent).toBe('No results found')
    })
})
