import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtCollapse } from './nt-collapse'

let trigger: HTMLElement
let target: HTMLElement

const setup = () => {
    document.body.innerHTML = `
        <button data-nt-collapse="#collapseTarget" id="collapseButton" aria-expanded="false">Toggle</button>
        <div id="collapseTarget" class="nt-collapse">Content</div>
    `

    trigger = document.getElementById('collapseButton')!
    target = document.getElementById('collapseTarget')!

    Object.defineProperty(target, 'scrollHeight', {
        configurable: true,
        get: () => 100
    })
}

describe('NtCollapse', () => {
    beforeEach(() => {
        vi.stubGlobal(
            'requestAnimationFrame',
            (cb: FrameRequestCallback) => {
                cb(0)
                return 0
            }
        )

        setup()
        NtCollapse.init()
    })

    afterEach(() => {
        document.body.innerHTML = ''
        vi.unstubAllGlobals()
    })

    it('should expand target when trigger is clicked', () => {
        trigger.click()

        expect(target.classList.contains('show')).toBe(true)
        expect(trigger.getAttribute('aria-expanded')).toBe('true')

        target.dispatchEvent(new Event('transitionend'))

        expect(target.style.height).toBe('auto')
    })

    it('should collapse target when clicked again', () => {
        trigger.click()
        target.dispatchEvent(new Event('transitionend'))

        trigger.click()
        expect(target.classList.contains('show')).toBe(false)
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
        expect(target.style.height).toBe('0px')

        target.dispatchEvent(new Event('transitionend'))
        expect(target.style.height).toBe('')
    })
})
