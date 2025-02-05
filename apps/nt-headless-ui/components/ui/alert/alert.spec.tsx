import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { X } from 'lucide-react'
import { describe, expect, test, vi } from 'vitest'

import { Alert, AlertVariant } from './alert'

const variantClasses = {
    default: 'bg-shade-neutral-9',
    danger: 'bg-danger-thin',
    warning: 'bg-warning-thin',
    success: 'bg-success-thin',
    info: 'bg-info-thin',
}

const variants = ['default', 'danger', 'success', 'warning', 'info']

describe('Alert Component', () => {
    test.each(variants)(
        'renders with correct variant class for %s',
        (variant) => {
            render(
                <Alert
                    variant={variant as AlertVariant}
                    title="Test Alert"
                    description="This is a test alert"
                />,
            )
            const alertElement = screen.getByRole('alert')
            expect(alertElement).toHaveClass(
                variantClasses[variant as AlertVariant],
            )
        },
    )

    test('renders with icon if provided', () => {
        render(
            <Alert
                title="With Icon"
                description="Alert with an icon"
                icon={<X data-testid="alert-icon" />}
            />,
        )
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
    })

    test('does not render an icon if none is provided', () => {
        render(
            <Alert
                title="No Icon"
                description="Alert without an icon"
            />,
        )
        expect(
            screen.queryByTestId('alert-icon'),
        ).not.toBeInTheDocument()
    })

    test('renders close icon and calls onClose when clicked', async () => {
        const onCloseMock = vi.fn()
        render(
            <Alert
                title="With Close"
                description="Alert with close button"
                onClose={onCloseMock}
            />,
        )

        const closeButton = screen.getByRole('close-x')
        expect(closeButton).toBeInTheDocument()

        await userEvent.click(closeButton)
        expect(onCloseMock).toHaveBeenCalled()
    })
})
