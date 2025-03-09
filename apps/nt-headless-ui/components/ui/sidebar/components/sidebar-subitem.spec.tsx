import { SidebarProvider } from '@headless-ui/components/radix/sidebar'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { vi } from 'vitest'

import { SidebarItem } from '../sidebar'
import { SideBarSubItem } from './sidebar-subitem'

vi.mock('./sidebar-item', () => ({
    SideBarItem: vi.fn(() => <div data-testid="sidebar-item" />),
}))

const mockItem: SidebarItem = {
    title: 'Test Group',
    active: false,
    subItems: [{ title: 'Sub Item 1' }, { title: 'Sub Item 2' }],
}

const renderWithProvider = (ui: React.ReactElement) => {
    return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('SideBarSubItem', () => {
    it('renders the item title', () => {
        renderWithProvider(
            <SideBarSubItem
                item={mockItem}
                className="custom-class"
            />,
        )
        expect(screen.getByText('Test Group')).toBeInTheDocument()
    })

    it('renders collapsible trigger', () => {
        renderWithProvider(
            <SideBarSubItem
                item={mockItem}
                className="custom-class"
            />,
        )
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders sub-items when expanded', () => {
        renderWithProvider(
            <SideBarSubItem
                item={mockItem}
                className="custom-class"
            />,
        )
        expect(screen.queryAllByTestId('sidebar-item')).toHaveLength(
            0,
        )
    })

    it('toggles sub-items visibility on click', () => {
        renderWithProvider(
            <SideBarSubItem
                item={mockItem}
                className="custom-class"
            />,
        )
        const trigger = screen.getByRole('button')

        fireEvent.click(trigger)
        expect(screen.queryAllByTestId('sidebar-item')).toHaveLength(
            2,
        )

        fireEvent.click(trigger)
        expect(screen.queryAllByTestId('sidebar-item')).toHaveLength(
            0,
        )
    })
})
