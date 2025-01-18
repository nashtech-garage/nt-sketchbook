import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './badge'

describe('Badge', () => {
    it('renders with default variant', () => {
        render(<Badge>Default Badge</Badge>)
        const badgeElement = screen.getByText('Default Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass(
            'text-white bg-success text-xs',
        )
    })

    it('renders with danger variant', () => {
        render(<Badge variant="danger">Danger Badge</Badge>)
        const badgeElement = screen.getByText('Danger Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass(
            'text-white bg-danger text-xs',
        )
    })

    it('renders with warning variant', () => {
        render(<Badge variant="warning">Warning Badge</Badge>)
        const badgeElement = screen.getByText('Warning Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass(
            'text-white bg-warning text-xs',
        )
    })

    it('renders with info variant', () => {
        render(<Badge variant="info">Info Badge</Badge>)
        const badgeElement = screen.getByText('Info Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('text-white bg-info text-xs')
    })

    it('renders with silver variant', () => {
        render(<Badge variant="silver">Silver Badge</Badge>)
        const badgeElement = screen.getByText('Silver Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass(
            'text-black bg-secondary-6 text-xs',
        )
    })

    it('renders with rounded full', () => {
        render(<Badge rounded>Rounded Badge</Badge>)
        const badgeElement = screen.getByText('Rounded Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('rounded-full')
    })

    it('renders with rounded md', () => {
        render(<Badge rounded={false}>Rounded Badge</Badge>)
        const badgeElement = screen.getByText('Rounded Badge')
        expect(badgeElement).toBeInTheDocument()
        expect(badgeElement).toHaveClass('rounded-md')
    })

    it('renders with left icon', () => {
        render(
            <Badge icon={<span>Icon</span>} iconPosition="left">
                Badge with Icon
            </Badge>,
        )
        const badgeElement = screen.getByText('Badge with Icon')
        const iconElement = screen.getByText('Icon')
        expect(badgeElement).toBeInTheDocument()
        expect(iconElement).toBeInTheDocument()
    })

    it('renders with right icon', () => {
        render(
            <Badge icon={<span>Icon</span>} iconPosition="right">
                Badge with Icon
            </Badge>,
        )
        const badgeElement = screen.getByText('Badge with Icon')
        const iconElement = screen.getByText('Icon')
        expect(badgeElement).toBeInTheDocument()
        expect(iconElement).toBeInTheDocument()
    })
})
