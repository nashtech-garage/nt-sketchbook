import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Switch, type SwitchProps } from './switch'

const handleChangeMock = vi.fn()

const setup = (props?: Partial<SwitchProps>) => {
    render(<Switch {...props} />)
}

describe('Switch Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders correctly', () => {
        setup()

        expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it.each([
        ['default', 'nt-switch'],
        ['danger', 'nt-switch nt-switch-danger'],
        ['warning', 'nt-switch nt-switch-warning']
    ] as const)(
        'applies correct class for variant: %s',
        (variant, expectedClass) => {
            setup({ variant })
            const input = screen.getByRole('switch')
            const label = input.closest('label')

            expect(label).toHaveClass(expectedClass)
        }
    )

    it('toggles state when clicked (uncontrolled)', async () => {
        setup({ defaultChecked: false })
        const input = screen.getByRole('switch') as HTMLInputElement

        expect(input.checked).toBe(false)
        await userEvent.click(input)
        expect(input.checked).toBe(true)

        await userEvent.click(input)
        expect(input.checked).toBe(false)
    })

    it('calls onChange when toggled', async () => {
        setup({ onChange: handleChangeMock })
        await userEvent.click(screen.getByRole('switch'))

        expect(handleChangeMock).toHaveBeenCalledTimes(1)
    })

    it('respects disabled state', () => {
        setup({ disabled: true })

        expect(screen.getByRole('switch')).toBeDisabled()
    })

    it('respects controlled checked state', () => {
        setup({ checked: true })
        const input = screen.getByRole('switch') as HTMLInputElement

        expect(input.checked).toBe(true)
    })
})
