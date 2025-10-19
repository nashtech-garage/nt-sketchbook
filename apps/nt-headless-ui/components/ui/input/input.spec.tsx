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
        ).toHaveClass('nt-input')
    })

    it.each([
        ['default', 'nt-input'],
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

    it('renders label when provided', () => {
        setup({
            label: 'Email',
            placeholder: 'label-input'
        })
        const label = screen.getByText('Email')
        expect(label).toBeInTheDocument()
        expect(label).toHaveClass('nt-input-label')
    })

    it('applies correct layout classes', () => {
        setup({ layout: 'float', placeholder: 'float-input' })
        const wrapper = screen
            .getByPlaceholderText('float-input')
            .closest('.nt-input-group')
        expect(wrapper).toHaveClass('nt-input-float')
    })

    it('shows message when provided', () => {
        setup({
            message: 'Helper text',
            placeholder: 'msg-input'
        })
        const message = screen.getByText('Helper text')
        expect(message).toBeInTheDocument()
        expect(message).toHaveClass('nt-input-highlight')
    })

    it('applies error state when hasError = true', () => {
        setup({
            hasError: true,
            message: 'Error occurred',
            placeholder: 'error-input'
        })
        const input = screen.getByPlaceholderText('error-input')
        const message = screen.getByText('Error occurred')
        expect(input).toHaveClass('nt-input-danger')
        expect(message).toHaveClass('nt-input-error')
    })

    it('renders message even without text when hasError = true', () => {
        setup({
            hasError: true,
            placeholder: 'error-no-msg'
        })
        const messageEl = screen.getByText('', {
            selector: 'span.nt-input-error'
        })
        expect(messageEl).toBeInTheDocument()
    })
})
