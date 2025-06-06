import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Card, type CardProps } from './card'

describe('Card Component', () => {
    it('renders with title and content', () => {
        const props: CardProps = {
            header: 'Card Title',
            children: 'This is a card content.',
        }
        const { getByText } = render(<Card {...props} />)
        expect(
            getByText((props.header ?? '').toString()),
        ).toBeInTheDocument()
        expect(
            getByText((props.children ?? '').toString()),
        ).toBeInTheDocument()
    })

    it('renders with footer', () => {
        const props: CardProps = {
            header: 'Card Title',
            children: 'This is a card content.',
            footer: 'This is a card footer.',
        }
        const { getByText } = render(<Card {...props} />)
        expect(
            getByText((props.header ?? '').toString()),
        ).toBeInTheDocument()
        expect(
            getByText((props.children ?? '').toString()),
        ).toBeInTheDocument()
        expect(
            getByText((props.footer ?? '').toString()),
        ).toBeInTheDocument()
    })

    it('renders with icon', () => {
        const props: CardProps = {
            header: 'Card Title',
            children: 'This is a card content.',
            icon: 'icon',
        }
        const { getByText } = render(<Card {...props} />)
        expect(
            getByText((props.header ?? '').toString()),
        ).toBeInTheDocument()
        expect(
            getByText((props.children ?? '').toString()),
        ).toBeInTheDocument()
        expect(getByText('icon')).toBeInTheDocument()
    })

    it('renders with variant', () => {
        const props: CardProps = {
            header: 'Card Title',
            children: 'This is a card content.',
            variant: 'success',
        }
        const { getByText } = render(<Card {...props} />)
        expect(
            getByText((props.header ?? '').toString()),
        ).toBeInTheDocument()
        expect(
            getByText((props.children ?? '').toString()),
        ).toBeInTheDocument()
    })
})
