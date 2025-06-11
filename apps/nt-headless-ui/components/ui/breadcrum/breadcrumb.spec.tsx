import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb, type BreadCrumbProps } from './breadcrumb'

const breadcrumbItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    {
        id: 'electronics',
        label: 'Electronics',
        href: '/electronics'
    },
    {
        id: 'smartphones',
        label: 'Smartphones',
        href: '/smartphones'
    },
    { id: 'latest', label: 'Latest', href: '/latest' }
]

const setup = ({
    items = breadcrumbItems,
    ...props
}: Partial<BreadCrumbProps> = {}) => {
    render(<Breadcrumb items={items} {...props} />)
}

describe('Breadcrumb', () => {
    it('renders all breadcrumb items and separators', () => {
        setup()
        expect(screen.getAllByRole('listitem').length).toBe(5)
        breadcrumbItems.forEach((item) => {
            expect(screen.getByText(item.label)).toBeInTheDocument()
        })
    })

    it('renders the last item as current (span, not link)', () => {
        setup()
        const last = screen.getByText('Latest')
        expect(last.tagName).toBe('SPAN')
        expect(last).toHaveClass('nt-breadcrumb-list-item-current')
    })

    it('applies custom className to nav', () => {
        setup({
            className: 'my-breadcrumb'
        })
        expect(screen.getByRole('navigation')).toHaveClass(
            'my-breadcrumb'
        )
    })

    it('passes extra props to nav', () => {
        setup({
            'data-testid': 'breadcrumb-nav'
        } as Partial<BreadCrumbProps>)
        expect(
            screen.getByTestId('breadcrumb-nav')
        ).toBeInTheDocument()
    })

    it('renders only nav when items is empty', () => {
        setup({ items: [] })
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).toBeNull()
    })

    it('applies custom className to breadcrumb items', () => {
        const items = [
            {
                id: 'home',
                label: 'Home',
                href: '/',
                className: 'custom-link'
            },
            {
                id: 'about',
                label: 'About',
                href: '/about',
                className: 'custom-link'
            },
            {
                id: 'current',
                label: 'Current',
                href: '#',
                className: 'custom-current'
            }
        ]
        setup({ items })
        expect(screen.getByText('Home')).toHaveClass('custom-link')
        expect(screen.getByText('About')).toHaveClass('custom-link')
        expect(screen.getByText('Current')).toHaveClass(
            'custom-current'
        )
    })
})
