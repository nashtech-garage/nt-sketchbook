import { SidebarProvider } from '@headless-ui/components/radix/sidebar'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Group } from '../sidebar'
import { SidebarGroup } from './sidebar-group'

const mockGroup: Group = {
    label: 'Test Group',
    items: [
        { title: 'Item 1', url: '/item1' },
        { title: 'Item 2', url: '/item2' },
    ],
}

const renderWithProvider = (ui: React.ReactElement) => {
    return render(<SidebarProvider>{ui}</SidebarProvider>)
}

describe('SidebarGroup', () => {
    it('renders the group label', () => {
        renderWithProvider(<SidebarGroup group={mockGroup} />)
        expect(screen.getByText('Test Group')).toBeInTheDocument()
    })

    it('renders all group items', () => {
        renderWithProvider(<SidebarGroup group={mockGroup} />)
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('applies the provided className', () => {
        const { container } = renderWithProvider(
            <SidebarGroup
                group={mockGroup}
                className="custom-class"
            />,
        )
        expect(
            container.querySelector('.custom-class'),
        ).toBeInTheDocument()
    })
})
