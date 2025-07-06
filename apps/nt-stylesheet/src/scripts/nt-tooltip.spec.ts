import userEvent from '@testing-library/user-event'
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtTooltip, type Placement } from './nt-tooltip'

let trigger: HTMLElement

type SetupProps = {
    id?: string
    text?: string
    title?: string
    placement?: Placement
    html?: boolean
    attributes?: Record<string, string>
}

const setup = (props: SetupProps = {}) => {
    const {
        id = 'tooltipBtn',
        text = 'Hover me',
        title = 'Tooltip content',
        placement = 'top',
        html = false,
        attributes = {}
    } = props

    const htmlAttr = html ? `data-nt-html="true"` : ''
    const dynamicAttrs = Object.entries(attributes)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ')

    document.body.innerHTML = `
      <button
        id="${id}"
        data-nt-toggle="tooltip"
        data-nt-placement="${placement}"
        title="${title}"
        ${htmlAttr}
        ${dynamicAttrs}
      >
        ${text}
      </button>
    `

    trigger = document.getElementById(id)!
}

const user = userEvent.setup()
describe('NtTooltip ', () => {
    beforeEach(() => {
        NtTooltip['instance'] = undefined
        NtTooltip.init()
    })

    afterEach(() => {
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('shows tooltip on hover', async () => {
        setup()
        await user.hover(trigger)

        const tooltip = document.querySelector(
            '.nt-tooltip'
        ) as HTMLElement

        expect(tooltip).toBeTruthy()
        expect(tooltip.textContent).toContain('Tooltip content')
    })

    it('hides tooltip on unhover', async () => {
        setup()
        await user.hover(trigger)
        expect(document.querySelector('.nt-tooltip')).toBeTruthy()

        await user.unhover(trigger)
        expect(document.querySelector('.nt-tooltip')).toBeNull()
    })

    it('renders HTML tooltip if data-nt-html is true', async () => {
        setup({ html: true, title: '<em>Italic</em>' })
        await user.hover(trigger)

        const inner = document.querySelector('.nt-tooltip-inner')
        expect(inner?.innerHTML).toBe('<em>Italic</em>')
    })

    it.each(['top', 'bottom', 'left', 'right'] as Placement[])(
        'uses correct placement: %s',
        async (placement) => {
            setup({ placement })
            await user.hover(trigger)

            const tooltip = document.querySelector('.nt-tooltip')
            expect(tooltip?.getAttribute('data-nt-placement')).toBe(
                placement
            )
        }
    )

    it.each([['default'], ['danger'], ['warning'], ['info']])(
        'applies variant class: %s',
        async (variant) => {
            setup({
                attributes: {
                    'data-nt-variant': variant
                }
            })

            await user.hover(trigger)

            const tooltip = document.querySelector('.nt-tooltip')
            expect(tooltip).toBeTruthy()
            expect(
                tooltip?.classList.contains(`nt-tooltip-${variant}`)
            ).toBe(true)
        }
    )
})
