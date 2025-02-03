import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
    it('renders the checkbox', () => {
        render(<Checkbox />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })

    it('renders when disabled', () => {
        render(<Checkbox disabled />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeDisabled()
        expect(checkbox).toHaveClass('disabled:cursor-not-allowed')
    })

    const sizes: {
        size: 'small' | 'medium' | 'large'
        expectedClass: string
    }[] = [
        { size: 'small', expectedClass: 'h-4 w-4' },
        { size: 'medium', expectedClass: 'h-5 w-5' },
        { size: 'large', expectedClass: 'h-6 w-6' },
    ]

    sizes.forEach(({ size, expectedClass }) => {
        it(`renders with the correct class for size ${size}`, () => {
            render(<Checkbox size={size} />)
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveClass(expectedClass)
        })
    })

    const variants: {
        variant: 'blue' | 'black'
        expectedClass: string
    }[] = [
        {
            variant: 'blue',
            expectedClass:
                'border-info data-[state=checked]:bg-info dark:data-[state=checked]:text-info dark:data-[state=checked]:bg-info',
        },
        {
            variant: 'black',
            expectedClass:
                'border-black data-[state=checked]:bg-black dark:data-[state=checked]:text-black dark:data-[state=checked]:bg-black',
        },
    ]

    variants.forEach(({ variant, expectedClass }) => {
        it(`renders with the correct class for variant ${variant}`, () => {
            render(<Checkbox variant={variant} />)
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).toHaveClass(expectedClass)
        })
    })
})
