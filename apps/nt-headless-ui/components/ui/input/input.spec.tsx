import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Input, type InputProps } from './input'

const defaultProps: InputProps = {
    placeholder: 'default-input',
    variant: 'default'
}

const setup = (overrideProps?: Partial<InputProps>) => {
    render(<Input {...defaultProps} {...overrideProps} />)
}

describe('Input component', () => {
    it('renders input with default props', () => {
        setup()
        expect(
            screen.getByPlaceholderText('default-input')
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('default-input')
        ).toHaveClass('nt-input-default')
    })

    it.each([
        ['default', 'nt-input-default'],
        ['danger', 'nt-input-danger'],
        ['warning', 'nt-input-warning'],
        ['success', 'nt-input-success']
    ] as const)(
        'applies correct class for variant: %s',
        (variant, expectedClass) => {
            setup({ variant, placeholder: variant })
            expect(screen.getByPlaceholderText(variant)).toHaveClass(
                expectedClass
            )
        }
    )

    it('renders with left and right icons', () => {
        setup({
            placeholder: 'icon-input',
            leftIcon: <span data-testid="left-icon">L</span>,
            rightIcon: <span data-testid="right-icon">R</span>
        })

        expect(screen.getByTestId('left-icon')).toBeInTheDocument()
        expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('wraps input in container when icon is present', () => {
        setup({
            placeholder: 'icon-wrap',
            leftIcon: <span>L</span>
        })
        const container = screen
            .getByText('L')
            .closest('.nt-input-container')
        expect(container).toBeInTheDocument()
    })

    it('merges custom className', () => {
        setup({
            className: 'custom-class',
            placeholder: 'class-test'
        })
        expect(screen.getByPlaceholderText('class-test')).toHaveClass(
            'custom-class'
        )
    })
})
