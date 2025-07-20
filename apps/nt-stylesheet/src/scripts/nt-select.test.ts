import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtSelect } from './nt-select'

NtSelect.init()

describe('NtSelect', () => {
    let button: HTMLButtonElement

    beforeEach(() => {
        document.body.innerHTML = `
      <button data-nt-toggle="select" aria-expanded="false">
        <div>Select an option</div>
        <ul>
          <li>Option 1</li>
        </ul>
      </button>
    `
        button = document.querySelector(
            '[data-nt-toggle="select"]'
        ) as HTMLButtonElement
    })

    afterEach(() => {
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('should toggle aria-expanded from false to true on click', () => {
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe('true')
    })

    it('should toggle aria-expanded from true to false on click', () => {
        button.setAttribute('aria-expanded', 'true')
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe('false')
    })

    it('should not throw if click is outside select', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        expect(() => {
            div.click()
        }).not.toThrow()
    })
})
