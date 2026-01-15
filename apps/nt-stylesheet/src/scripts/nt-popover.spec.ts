import userEvent from '@testing-library/user-event'
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { NtPopover, type Placement } from './nt-popover'

let trigger: HTMLElement

const user = userEvent.setup()

type SetupProps = {
    id?: string
    text?: string
    content?: string
    title?: string
    placement?: Placement
    html?: boolean
    dismissible?: boolean
    variant?: string
}

const setup = (props: SetupProps = {}) => {
    const {
        id = 'popoverBtn',
        text = 'Click me',
        content = 'Popover content',
        title,
        placement = 'top',
        html = false,
        dismissible = false,
        variant = 'default'
    } = props

    const htmlAttr = html ? `data-nt-html="true"` : ''
    const titleAttr = title ? `data-nt-title="${title}"` : ''
    const dismissAttr = dismissible
        ? `data-nt-dismissible="true"`
        : ''

    document.body.innerHTML = `
    <button
      id="${id}"
      data-nt-toggle="popover"
      data-nt-placement="${placement}"
      data-nt-content="${content}"
      data-nt-variant="${variant}"
      ${htmlAttr}
      ${titleAttr}
      ${dismissAttr}
    >
      ${text}
    </button>
  `

    trigger = document.getElementById(id)!
}

describe('NtPopover', () => {
    beforeEach(() => {
        NtPopover.clearInstance()
        NtPopover.init()
    })

    afterEach(() => {
        document.body.innerHTML = ''
        NtPopover.clearInstance()
        vi.clearAllMocks()
    })
    it('adds dismiss button if data-nt-dismissible is true', async () => {
        setup({ dismissible: true })
        await user.click(trigger)

        const closeBtn = document.querySelector('.nt-popover-close')
        expect(closeBtn).toBeTruthy()

        await user.click(closeBtn!)
        expect(document.querySelector('.nt-popover')).toBeNull()
    })

    it('shows popover on click', async () => {
        setup()
        await user.click(trigger)

        const popover = document.querySelector(
            '.nt-popover'
        ) as HTMLElement
        expect(popover).toBeTruthy()
        expect(popover.textContent).toContain('Popover content')
    })

    it('hides popover on outside click', async () => {
        setup()
        await user.click(trigger)
        expect(document.querySelector('.nt-popover')).toBeTruthy()

        await user.click(document.body)
        expect(document.querySelector('.nt-popover')).toBeNull()
    })

    it('renders HTML content if data-nt-html is true', async () => {
        setup({ html: true, content: '<b>Bold</b>' })
        await user.click(trigger)

        const contentEl = document.querySelector('.nt-popover-body')
        expect(contentEl?.innerHTML).toContain('<b>Bold</b>')
    })

    it('renders popover title if data-nt-title is present', async () => {
        setup({ title: 'Popover Title' })
        await user.click(trigger)

        const titleEl = document.querySelector('.nt-popover-title')
        expect(titleEl).toBeTruthy()
        expect(titleEl?.textContent).toBe('Popover Title')
    })

    it.each(['top', 'bottom', 'left', 'right'] as Placement[])(
        'uses correct placement: %s',
        async (placement) => {
            setup({ placement })
            await user.click(trigger)

            const popover = document.querySelector('.nt-popover')
            expect(popover?.getAttribute('data-nt-placement')).toBe(
                placement
            )
        }
    )

    it.each(['default', 'success', 'danger', 'warning', 'info'])(
        'applies variant class: %s',
        async (variant) => {
            setup({ variant })
            await user.click(trigger)

            const popover = document.querySelector('.nt-popover')
            expect(
                popover?.classList.contains(`nt-popover-${variant}`)
            ).toBe(true)
        }
    )

    it('closes on Escape key press', async () => {
        setup()
        await user.click(trigger)
        expect(document.querySelector('.nt-popover')).toBeTruthy()

        const escapeEvent = new KeyboardEvent('keydown', {
            key: 'Escape'
        })
        document.dispatchEvent(escapeEvent)
        expect(document.querySelector('.nt-popover')).toBeNull()
    })
})
