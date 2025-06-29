import { beforeEach, describe, expect, it } from 'vitest'

import { NtCheckBox } from './nt-checkbox'

const setup = () =>
    (document.body.innerHTML = `
<input type="checkbox" id="indeterminate" />
<input type="checkbox" id="indeterminate-disabled" />
`)

describe('NtCheckBox', () => {
    beforeEach(() => setup())

    it('should set indeterminate to true for specific checkboxes', () => {
        const checkbox1 = document.getElementById(
            'indeterminate'
        ) as HTMLInputElement
        const checkbox2 = document.getElementById(
            'indeterminate-disabled'
        ) as HTMLInputElement

        expect(checkbox1.indeterminate).toBe(false)
        expect(checkbox2.indeterminate).toBe(false)

        NtCheckBox.init()

        expect(checkbox1.indeterminate).toBe(true)
        expect(checkbox2.indeterminate).toBe(true)
    })

    it('should not throw if elements are missing', () => {
        document.body.innerHTML = ''

        expect(() => NtCheckBox.init()).not.toThrow()
    })
})
