import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, test, vi } from 'vitest'

import { Switch } from './switch'

describe('Switch Component', () => {
    test('renders the switch component', () => {
        render(<Switch />)
        const switchElement = screen.getByRole('switch')
        expect(switchElement).toBeInTheDocument()
    })

    it.each([
        [
            'default',
            'data-[state=checked]:bg-success data-[state=unchecked]:bg-neutral-200',
        ],
        [
            'primary',
            'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-200',
        ],
        [
            'black',
            'data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-gray-200',
        ],
        [
            'danger',
            'data-[state=checked]:bg-danger data-[state=unchecked]:bg-gray-200',
        ],
    ])(
        'applies the correct variant classes for %s',
        (variant, expectedClass) => {
            render(<Switch variant={variant as any} />)
            const switchElement = screen.getByRole('switch')

            expect(switchElement).toHaveClass(
                expectedClass.split(' ')[0],
            )
        },
    )

    it.each([
        ['small', 'h-5 w-9'],
        ['medium', 'h-8 w-12'],
    ])(
        'applies the correct size classes for %s',
        (size, expectedClass) => {
            render(<Switch size={size as any} />)
            const switchElement = screen.getByRole('switch')

            expect(switchElement).toHaveClass(
                expectedClass.split(' ')[0],
            )
        },
    )

    test('toggles state on click', () => {
        render(<Switch />)
        const switchElement = screen.getByRole('switch')

        expect(switchElement).toHaveAttribute(
            'data-state',
            'unchecked',
        )

        fireEvent.click(switchElement)
        expect(switchElement).toHaveAttribute('data-state', 'checked')

        fireEvent.click(switchElement)
        expect(switchElement).toHaveAttribute(
            'data-state',
            'unchecked',
        )
    })

    test('calls onCheckedChange when toggled', () => {
        const handleChange = vi.fn()
        render(<Switch onCheckedChange={handleChange} />)

        const switchElement = screen.getByRole('switch')
        fireEvent.click(switchElement)

        expect(handleChange).toHaveBeenCalledTimes(1)
    })
})
