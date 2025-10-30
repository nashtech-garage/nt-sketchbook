import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { InputMessage, type InputMessageProps } from './input-message'

const defaultProps: InputMessageProps = {
    message: '',
    hasError: false
}

const setup = (props?: Partial<InputMessageProps>) => {
    render(<InputMessage {...defaultProps} {...props} />)
}

describe('InputMessage component', () => {
    it('renders nothing when no message and no error', () => {
        const { container } = render(<InputMessage />)
        expect(container.firstChild).toBeNull()
    })

    it('renders message when provided', () => {
        setup({ message: 'Helper text' })

        expect(screen.getByText('Helper text')).toBeInTheDocument()
        expect(screen.getByText('Helper text')).toHaveClass(
            'nt-input-highlight'
        )
    })

    it('applies error class when hasError = true', () => {
        setup({ message: 'Error occurred', hasError: true })
        const message = screen.getByText('Error occurred')
        expect(message).toBeInTheDocument()
        expect(message).toHaveClass('nt-input-error')
    })

    it('renders empty span when hasError = true but no message', () => {
        setup({ hasError: true })

        const messageEl = screen.getByText('', {
            selector: 'span.nt-input-error'
        })
        expect(messageEl).toBeInTheDocument()
        expect(messageEl).toHaveClass('nt-input-error')
    })
})
