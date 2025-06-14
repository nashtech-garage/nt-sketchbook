import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb } from './breadcrumb'

describe('Breadcrumb', () => {
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

    it('renders all breadcrumb items and separators', () => {
        render(<Breadcrumb items={breadcrumbItems} />)
        // 5 items, 4 separators
        expect(screen.getAllByRole('listitem').length).toBe(9)
        breadcrumbItems.forEach((item) => {
            expect(screen.getByText(item.label)).toBeInTheDocument()
        })
        expect(
            document.querySelectorAll('.nt-breadcrumb-separator')
                .length
        ).toBe(4)
    })

    it('renders the last item as current (span, not link)', () => {
        render(<Breadcrumb items={breadcrumbItems} />)
        const last = screen.getByText('Latest')
        expect(last.tagName).toBe('SPAN')
        expect(last).toHaveClass('nt-breadcrumb-current')
    })

    it('renders the first item with the icon', () => {
        render(<Breadcrumb items={breadcrumbItems} />)
        const first = screen.getByText('Home')
        // Check if an SVG icon exists within the same parent as the first breadcrumb item
        expect(
            first.parentElement?.querySelector('svg')
        ).toBeInTheDocument()
    })

    it('renders custom separator if provided', () => {
        render(
            <Breadcrumb
                items={breadcrumbItems}
                separator={<span data-testid="custom-sep">*</span>}
            />
        )
        expect(screen.getAllByTestId('custom-sep').length).toBe(4)
    })

    it('applies custom className to nav', () => {
        render(
            <Breadcrumb
                items={breadcrumbItems}
                className="my-breadcrumb"
            />
        )
        expect(screen.getByRole('navigation')).toHaveClass(
            'my-breadcrumb'
        )
    })

    it('passes extra props to nav', () => {
        render(
            <Breadcrumb
                items={breadcrumbItems}
                data-testid="breadcrumb-nav"
            />
        )
        expect(
            screen.getByTestId('breadcrumb-nav')
        ).toBeInTheDocument()
    })

    it('renders only nav when items is empty', () => {
        render(<Breadcrumb items={[]} />)
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
        render(<Breadcrumb items={items} />)
        expect(screen.getByText('Home')).toHaveClass('custom-link')
        expect(screen.getByText('About')).toHaveClass('custom-link')
        expect(screen.getByText('Current')).toHaveClass(
            'custom-current'
        )
    })
})
