import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card, type CardProps } from './card'

const defaultProps: CardProps = {
    header: 'Card Title',
    children: 'This is a card content.'
}

const setup = (props: Partial<CardProps> = {}) =>
    render(<Card {...defaultProps} {...props} />)

describe('Card Component', () => {
    it('renders with footer', () => {
        setup({ footer: 'This is a card footer.' })

        expect(
            screen.getByText('This is a card footer.')
        ).toBeInTheDocument()
    })

    it('renders with icon', () => {
        setup({ icon: 'icon' })

        expect(screen.getByText('icon')).toBeInTheDocument()
    })
})
