import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './button'

describe('Button', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', {
            name: /click me/i,
        })
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('bg-primary text-white')
    })

    it('renders with primary variant and default size', () => {
        render(<Button variant="primary">Primary Button</Button>)
        const button = screen.getByRole('button', {
            name: /primary button/i,
        })
        expect(button).toHaveClass('bg-primary text-white')
    })

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary Button</Button>)
        const button = screen.getByRole('button', {
            name: /secondary button/i,
        })
        expect(button).toHaveClass('bg-shade-secondary-1 text-white')
    })

    it('renders with outline variant', () => {
        render(<Button variant="outline">Outline Button</Button>)
        const button = screen.getByRole('button', {
            name: /outline button/i,
        })
        expect(button).toHaveClass(
            'border border-primary text-primary',
        )
    })

    it('renders with different sizes', () => {
        render(<Button size="small">Small Button</Button>)
        const button = screen.getByRole('button', {
            name: /small button/i,
        })
        expect(button).toHaveClass('h-8 px-3 text-xs')

        render(<Button size="large">Large Button</Button>)
        const largeButton = screen.getByRole('button', {
            name: /large button/i,
        })
        expect(largeButton).toHaveClass('h-10 px-8')
    })

    it('renders with an icon on the left', () => {
        render(
            <Button icon={<span>Icon</span>}>
                Button with Icon
            </Button>,
        )
        const button = screen.getByRole('button', {
            name: /button with icon/i,
        })
        expect(button).toContainHTML('<span>Icon</span>')
    })

    it('renders with an icon on the right', () => {
        render(
            <Button icon={<span>Icon</span>} iconPosition="right">
                Button with Icon
            </Button>,
        )
        const button = screen.getByRole('button', {
            name: /button with icon/i,
        })
        expect(button).toContainHTML('<span>Icon</span>')
    })

    it('renders as disabled', () => {
        render(<Button disabled>Disabled Button</Button>)
        const button = screen.getByRole('button', {
            name: /disabled button/i,
        })
        expect(button).toBeDisabled()
    })
})
