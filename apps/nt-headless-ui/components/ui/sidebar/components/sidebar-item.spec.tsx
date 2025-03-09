import { SidebarProvider } from '@headless-ui/components/radix/sidebar'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { vi } from 'vitest'

import { SidebarItem } from '../sidebar'
import { SideBarItem } from './sidebar-item'

// Mock sub-item component
vi.mock('./sidebar-subitem', () => ({
    SideBarSubItem: vi.fn(() => (
        <div data-testid="sidebar-subitem" />
    )),
}))

const mockItem: SidebarItem = {
    title: 'Test Item',
    url: '/test-url',
    active: false,
}

// Helper function to wrap component with SidebarProvider
const renderWithProvider = (ui: React.ReactElement) => {
    return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('SideBarItem', () => {
    it('renders the item title', () => {
        renderWithProvider(<SideBarItem item={mockItem} />)
        expect(screen.getByText('Test Item')).toBeInTheDocument()
    })

    it('applies the provided className', () => {
        const { container } = renderWithProvider(
            <SideBarItem item={mockItem} className="custom-class" />,
        )
        expect(
            container.querySelector('.custom-class'),
        ).toBeInTheDocument()
    })

    it('renders a link with the correct href', () => {
        renderWithProvider(<SideBarItem item={mockItem} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/test-url')
    })

    it('renders an icon if provided', () => {
        const MockIcon = () => <svg data-testid="mock-icon" />
        const itemWithIcon = { ...mockItem, icon: MockIcon }

        renderWithProvider(<SideBarItem item={itemWithIcon} />)
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('renders the sub-item component if subItems exist', () => {
        const itemWithSubItems = {
            ...mockItem,
            subItems: [{ title: 'Sub Item', url: '/sub-url' }],
        }

        renderWithProvider(<SideBarItem item={itemWithSubItems} />)
        expect(
            screen.getByTestId('sidebar-subitem'),
        ).toBeInTheDocument()
    })
})
