import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Button, type ButtonProps } from './button'

const onClickMock = vi.fn()

const defaultProps: ButtonProps = {
    children: 'Default Button',
    onClick: onClickMock
}

const setup = (Props: Partial<ButtonProps> = {}) =>
    render(<Button {...defaultProps} {...Props} />)

describe('Button', () => {
    beforeEach(() => {
        onClickMock.mockClear()
    })

    it('renders children correctly', () => {
        setup({ children: 'Click Me' })
        expect(screen.getByRole('button')).toHaveTextContent(
            'Click Me'
        )
    })

    it('uses default variant and size', () => {
        setup()
        const button = screen.getByRole('button')

        expect(button.className).toContain('nt-button')
        expect(button.className).toContain('nt-button-primary')
        expect(button.className).not.toContain('nt-button-sm')
        expect(button.className).not.toContain('nt-button-lg')
    })

    it.each([
        ['neutral', 'nt-button-neutral'],
        ['primary', 'nt-button-primary'],
        ['secondary', 'nt-button-secondary'],
        ['success', 'nt-button-success'],
        ['gradient', 'nt-button-gradient']
    ])('applies variant %s correctly', (variant, expectedClass) => {
        setup({ variant: variant as ButtonProps['variant'] })
        const button = screen.getByRole('button')

        expect(button.className).toContain(expectedClass)
    })

    it.each([
        [
            'secondary',
            true,
            ['nt-button-outline', 'nt-button-secondary'],
            []
        ],
        [
            'gradient',
            true,
            ['nt-button-gradient'],
            ['nt-button-outline']
        ]
    ])(
        'applies outline logic correctly for variant %s with outline=%s',
        (
            variant,
            outline,
            expectedClasses: string[],
            notExpectedClasses: string[]
        ) => {
            setup({
                variant: variant as ButtonProps['variant'],
                outline
            })

            const button = screen.getByRole('button')

            expectedClasses.forEach((cls) => {
                expect(button.className).toContain(cls)
            })

            notExpectedClasses.forEach((cls) => {
                expect(button.className).not.toContain(cls)
            })
        }
    )

    it('ignores outline for gradient variant', () => {
        setup({ variant: 'gradient', outline: true })

        const button = screen.getByRole('button')

        expect(button.className).toContain('nt-button-gradient')
        expect(button.className).not.toContain('nt-button-outline')
    })

    it.each([
        ['sm', 'nt-button-sm'],
        ['md', ''],
        ['lg', 'nt-button-lg']
    ])('applies size %s correctly', (size, expectedClass) => {
        setup({ size: size as ButtonProps['size'] })

        const button = screen.getByRole('button')

        if (expectedClass) {
            expect(button.className).toContain(expectedClass)
        } else {
            expect(button.className).not.toContain('nt-button-sm')
            expect(button.className).not.toContain('nt-button-lg')
        }
    })

    it('calls onClick when clicked', () => {
        setup()

        fireEvent.click(screen.getByRole('button'))

        expect(onClickMock).toHaveBeenCalled()
    })
})
