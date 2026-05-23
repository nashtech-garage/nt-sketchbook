import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { MenuProps } from './menu'
import { Menu } from './menu'

const mockOnClick = vi.fn()
const mockOnSearchChange = vi.fn()

const defaultProps: MenuProps = {}

const setup = (props?: Partial<MenuProps>) =>
    render(<Menu {...defaultProps} {...props} />)

describe('Menu', () => {
    it('renders root menu class', () => {
        const { container } = setup()
        expect(container.firstChild).toHaveClass('nt-menu')
    })

    it.each([
        ['compact', 'nt-menu-compact'],
        ['select', 'nt-menu-select'],
        ['search', 'nt-menu-search'],
        ['sidebar', 'nt-menu-sidebar']
    ] as const)('applies %s variant class', (variant, className) => {
        const { container } = setup({ variant })
        expect(container.firstChild).toHaveClass(className)
    })

    it('renders sections, titles and items from config', () => {
        setup({
            sections: [
                {
                    title: 'Workspace',
                    items: [{ label: 'Projects' }]
                }
            ]
        })

        expect(screen.getByText('Workspace')).toHaveClass(
            'nt-menu-title'
        )
        expect(screen.getByRole('list')).toHaveClass('nt-menu-list')
        expect(
            screen.getByRole('button', { name: 'Projects' })
        ).toHaveClass('nt-menu-item')
    })

    it('renders direct items when sections are not provided', () => {
        setup({
            items: [{ label: 'Overview' }, { label: 'Activity' }]
        })

        expect(
            screen.getByRole('button', { name: 'Overview' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Activity' })
        ).toBeInTheDocument()
    })

    it('applies active, danger and disabled item states', () => {
        setup({
            items: [
                {
                    label: 'Delete',
                    active: true,
                    danger: true,
                    disabled: true
                }
            ]
        })

        const item = screen.getByRole('button', { name: 'Delete' })
        expect(item).toHaveClass('is-active', 'is-danger')
        expect(item).toBeDisabled()
    })

    it('calls item click handlers', async () => {
        setup({
            items: [{ label: 'Open', onClick: mockOnClick }]
        })

        const item = screen.getByRole('button', { name: 'Open' })
        await item.click()

        expect(mockOnClick).toHaveBeenCalled()
    })

    it('renders anchor items when href is provided', () => {
        setup({
            items: [{ label: 'Settings', href: '/settings' }]
        })

        const link = screen.getByRole('link', { name: 'Settings' })
        expect(link).toHaveAttribute('href', '/settings')
        expect(link).toHaveClass('nt-menu-item')
    })

    it('renders item adornments from config', () => {
        setup({
            items: [
                {
                    label: 'Reports',
                    description: 'Monthly activity',
                    icon: 'Icon',
                    shortcut: 'Cmd+R',
                    badge: '4',
                    check: 'Checked',
                    color: 'red',
                    flag: 'VN'
                }
            ]
        })

        expect(screen.getByText('Icon')).toHaveClass('nt-menu-icon')
        expect(screen.getByText('Reports')).toHaveClass(
            'nt-menu-label'
        )
        expect(screen.getByText('Monthly activity')).toHaveClass(
            'nt-menu-description'
        )
        expect(screen.getByText('Cmd+R')).toHaveClass(
            'nt-menu-shortcut'
        )
        expect(screen.getByText('4')).toHaveClass('nt-menu-badge')
        expect(screen.getByText('Checked')).toHaveClass(
            'nt-menu-check'
        )
        expect(screen.getByText('VN')).toHaveClass('nt-menu-flag')
        expect(
            document.querySelector('.nt-menu-color-dot')
        ).toBeInTheDocument()
    })

    it('renders search input and calls onChange', async () => {
        setup({
            search: {
                placeholder: 'Search',
                onChange: mockOnSearchChange
            }
        })

        const input = screen.getByPlaceholderText('Search')
        fireEvent.change(input, { target: { value: 'abc' } })

        expect(mockOnSearchChange).toHaveBeenCalled()
        expect(input).toHaveClass('nt-menu-search-input')
    })

    it('renders scroll and empty states', () => {
        setup({
            empty: 'No results',
            scrollable: true
        })

        expect(screen.getByText('No results')).toHaveClass(
            'nt-menu-empty'
        )
        expect(
            screen.getByText('No results').parentElement
        ).toHaveClass('nt-menu-scroll')
    })

    it('renders nested submenu items from config', () => {
        setup({
            items: [
                {
                    label: 'More actions',
                    chevron: '>',
                    items: [{ label: 'Archive' }]
                }
            ]
        })

        expect(
            screen.getByRole('menuitem', { name: /more actions/i })
        ).toBeInTheDocument()
        expect(screen.getByText('>')).toHaveClass('nt-menu-chevron')
        expect(screen.getByText('Archive')).toBeInTheDocument()
        expect(
            document.querySelector('.nt-menu-submenu')
        ).toBeInTheDocument()
    })

    it('renders children instead of config when children are provided', () => {
        setup({
            items: [{ label: 'Config item' }],
            children: <span>Custom content</span>
        })

        expect(screen.getByText('Custom content')).toBeInTheDocument()
        expect(
            screen.queryByText('Config item')
        ).not.toBeInTheDocument()
    })
})
