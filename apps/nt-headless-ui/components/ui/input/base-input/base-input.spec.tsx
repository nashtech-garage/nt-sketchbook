import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BaseInput, type BaseInputProps } from './base-input'

const mockPlaceholder = 'base-input'
const defaultProps: BaseInputProps = {
    placeholder: mockPlaceholder,
    className: ''
}

const setup = (props?: Partial<BaseInputProps>) => {
    render(<BaseInput {...defaultProps} {...props} />)
}

describe('BaseInput component', () => {
    it('renders input element correctly', () => {
        setup()

        const input = screen.getByPlaceholderText(mockPlaceholder)
        expect(input).toBeInTheDocument()
        expect(input.tagName).toBe('INPUT')
    })

    it('applies the default nt-input class', () => {
        setup()

        expect(
            screen.getByPlaceholderText(mockPlaceholder)
        ).toHaveClass('nt-input')
    })

    it('merges custom className properly', () => {
        setup({ className: 'custom-class' })

        const input = screen.getByPlaceholderText(mockPlaceholder)
        expect(input).toHaveClass('nt-input')
        expect(input).toHaveClass('custom-class')
    })

    it('passes through additional props', () => {
        setup({ type: 'password', value: 'secret' })

        expect(screen.getByDisplayValue('secret')).toHaveAttribute(
            'type',
            'password'
        )
    })
})
