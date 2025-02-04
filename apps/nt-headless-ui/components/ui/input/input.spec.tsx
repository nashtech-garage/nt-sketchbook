import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'

import { Input, InputSize, InputVariant } from './input'

const variantClasses: Record<InputVariant, string> = {
    default: 'border-secondary-6',
    danger: 'border-danger',
    warning: 'border-warning',
    violet: 'border-secondary-1',
    success: 'border-success',
}

const sizeClasses: Record<InputSize, string> = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
}

const variants: InputVariant[] = Object.keys(
    variantClasses,
) as InputVariant[]
const sizes: InputSize[] = Object.keys(sizeClasses) as InputSize[]

describe('Input Component', () => {
    test.each(variants)(
        'renders correctly with variant: %s',
        (variant) => {
            render(<Input variant={variant} data-testid="input" />)
            const inputElement = screen.getByTestId('input')
            expect(inputElement).toHaveClass(variantClasses[variant])
        },
    )

    test.each(sizes)(
        'renders correctly with inputSize: %s',
        (inputSize) => {
            render(
                <Input inputSize={inputSize} data-testid="input" />,
            )
            const inputElement = screen.getByTestId('input')
            expect(inputElement).toHaveClass(sizeClasses[inputSize])
        },
    )

    test.each(
        variants.flatMap((variant) =>
            sizes.map((size) => [variant, size]),
        ),
    )(
        'renders correctly with variant: %s and inputSize: %s',
        (variant, inputSize) => {
            render(
                <Input
                    variant={variant as InputVariant}
                    inputSize={inputSize as InputSize}
                    data-testid="input"
                />,
            )
            const inputElement = screen.getByTestId('input')
            expect(inputElement).toHaveClass(
                variantClasses[variant as InputVariant],
            )
            expect(inputElement).toHaveClass(
                sizeClasses[inputSize as InputSize],
            )
        },
    )

    test('renders left and right icons correctly', () => {
        const leftIcon = <span>Left</span>
        const rightIcon = <span>Right</span>

        render(
            <Input
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                placeholder="Test input"
            />,
        )
        expect(screen.getByText('Left')).toBeInTheDocument()
        expect(screen.getByText('Right')).toBeInTheDocument()
    })
})
