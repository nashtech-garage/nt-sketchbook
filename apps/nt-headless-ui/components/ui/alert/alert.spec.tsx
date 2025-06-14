import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InfoIcon } from 'lucide-react'
import { describe, expect, test, vi } from 'vitest'

import { Alert, type AlertProps, type AlertType } from './alert'

const typeClasses = {
    info: 'nt-alert-info',
    danger: 'nt-alert-danger',
    success: 'nt-alert-success',
    warning: 'nt-alert-warning'
}
const mockOnClose = vi.fn()

const setup = (props: Partial<AlertProps> = {}) => {
    const defaultProps: AlertProps = {
        type: 'info',
        message: 'Default message',
        ...props
    }
    render(<Alert {...defaultProps} />)
}

describe('Alert Component', () => {
    test.each(Object.keys(typeClasses))(
        'renders correct class for type "%s"',
        (type) => {
            setup({ type: type as AlertType })

            expect(screen.getByRole('alert')).toHaveClass(
                typeClasses[type as keyof typeof typeClasses]
            )
        }
    )

    test('renders message correctly', () => {
        setup({ message: 'Hello World' })

        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    test('renders custom icon when provided', () => {
        setup({
            icon: <InfoIcon data-testid="custom-icon" />
        })

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    test('does not render icon if icon prop is missing', () => {
        setup()

        expect(
            screen.queryByTestId('custom-icon')
        ).not.toBeInTheDocument()
    })

    test('renders custom class', () => {
        setup({
            className: 'custom-class'
        })

        expect(screen.getByRole('alert').className).toContain(
            'custom-class'
        )
    })

    test('renders close button and calls onClose when clicked', async () => {
        setup({ onClose: mockOnClose })

        const closeButton = screen.getByLabelText('Close')

        expect(closeButton).toBeInTheDocument()

        await userEvent.click(closeButton)

        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
})
