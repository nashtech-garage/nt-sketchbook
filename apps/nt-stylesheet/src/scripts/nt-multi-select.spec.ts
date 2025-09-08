import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { NtMultiSelect, type Variant } from './nt-multi-select'

let selectEl: HTMLSelectElement
let inputEl: HTMLInputElement
let dropdownEl: HTMLUListElement

type SetupOption = {
    variant?: Variant
}

const setup = (options: SetupOption = {}) => {
    document.body.innerHTML = `
      <select data-nt-multi-select multiple data-placeholder="Choose items" ${
          options.variant ? `data-variant="${options.variant}"` : ''
      }>
        <option value="1">Apple</option>
        <option value="2">Banana</option>
        <option value="3">Cherry</option>
      </select>
    `

    NtMultiSelect.init()

    selectEl = document.querySelector('select[data-nt-multi-select]')!
    inputEl = document.querySelector('.nt-multi-select-input')!
    dropdownEl = document.querySelector('.nt-multi-select-dropdown')!
}

describe('NtMultiSelect', () => {
    beforeEach(() => {
        setup()
    })

    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('should hide the original select element', () => {
        expect(
            selectEl.classList.contains('nt-multi-select-hidden')
        ).toBe(true)
    })

    it('should render wrapper and dropdown', () => {
        const wrapper = selectEl.nextElementSibling as HTMLElement
        expect(wrapper).toBeTruthy()
        expect(wrapper.classList.contains('nt-multi-select')).toBe(
            true
        )

        const control = wrapper.querySelector(
            '.nt-multi-select-control'
        )
        const dropdown = wrapper.querySelector(
            '.nt-multi-select-dropdown'
        )

        expect(control).not.toBeNull()
        expect(dropdown).not.toBeNull()
    })

    it('should show dropdown on input focus', () => {
        inputEl.focus()
        expect(dropdownEl.classList.contains('hidden')).toBe(false)
    })

    it('should select an option and show as tag', () => {
        inputEl.focus()

        const options = document.querySelectorAll(
            '.nt-multi-select-dropdown-option'
        )
        expect(options.length).toBe(3)

        options[0].dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        )

        const tag = document.querySelector('.nt-multi-select-tag')
        expect(tag).not.toBeNull()
        expect(tag?.textContent).toContain('Apple')

        expect(selectEl.options[0].selected).toBe(true)
    })

    it('should remove a tag and deselect option', () => {
        inputEl.focus()

        const options = document.querySelectorAll(
            '.nt-multi-select-dropdown-option'
        )
        options[1].dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        )

        const removeBtn = document.querySelector(
            '.nt-multi-select-tag-remove'
        ) as HTMLElement
        removeBtn.click()

        expect(
            document.querySelector('.nt-multi-select-tag')
        ).toBeNull()
        expect(selectEl.options[1].selected).toBe(false)
    })

    it('should not show already selected options in dropdown', () => {
        inputEl.focus()
        const options = document.querySelectorAll(
            '.nt-multi-select-dropdown-option'
        )
        options[2].dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        )

        inputEl.focus()
        const visibleOptions = document.querySelectorAll(
            '.nt-multi-select-dropdown-option'
        )
        expect(
            Array.from(visibleOptions).map((opt) => opt.textContent)
        ).not.toContain('Cherry')
    })

    it('should show placeholder when no items selected', () => {
        expect(inputEl.placeholder).toBe('Choose items')
    })

    it('should hide placeholder when item is selected', () => {
        inputEl.focus()
        const options = document.querySelectorAll(
            '.nt-multi-select-dropdown-option'
        )
        options[0].dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        )

        expect(inputEl.placeholder).toBe('')
    })

    it.each([
        {
            variant: 'primary',
            expectedClass: 'nt-multi-select-primary'
        },
        {
            variant: 'danger',
            expectedClass: 'nt-multi-select-danger'
        },
        {
            variant: 'success',
            expectedClass: 'nt-multi-select-success'
        },
        { variant: '', expectedClass: null }
    ])(
        'should apply correct variant class for $variant',
        ({ variant, expectedClass }) => {
            setup({ variant: variant as Variant })

            const wrapper = document.querySelector(
                '.nt-multi-select'
            )!
            if (expectedClass) {
                expect(
                    wrapper.classList.contains(expectedClass)
                ).toBe(true)
            } else {
                expect(wrapper.className).not.toMatch(
                    /nt-multi-select-\w+/
                )
            }
        }
    )
})
