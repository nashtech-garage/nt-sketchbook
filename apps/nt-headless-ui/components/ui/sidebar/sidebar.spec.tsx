import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { SidebarProps } from './sidebar'
import { Sidebar } from './sidebar'

const mockGroups: SidebarProps['groups'] = [
    {
        title: 'Group 1',
        items: [
            { title: 'Item 1', url: '/item1' },
            { title: 'Item 2', url: '/item2' },
        ],
    },
    {
        title: 'Group 2',
        items: [{ title: 'Item 3', url: '/item3' }],
    },
]

describe('Sidebar', () => {
    it('renders without crashing', () => {
        render(<Sidebar />)
        waitFor(() => {
            expect(screen.getByText('Group 1')).toBeInTheDocument()
            expect(screen.getByText('Group 2')).toBeInTheDocument()
        })
    })

    it('renders header and footer when provided', () => {
        render(
            <Sidebar
                header={<div>Header</div>}
                footer={<div>Footer</div>}
            />,
        )
        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('renders groups correctly', () => {
        render(<Sidebar groups={mockGroups} />)
        expect(screen.getByText('Group 1')).toBeInTheDocument()
        expect(screen.getByText('Group 2')).toBeInTheDocument()
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
        expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('renders sidebar toggle button if isToggleSideBar is true', async () => {
        render(<Sidebar isToggleSideBar={true} />)
        const toggleButton = screen.getByRole('button')
        expect(toggleButton).toBeInTheDocument()
        await userEvent.click(toggleButton)
    })

    it('renders header and footer content correctly', () => {
        render(
            <Sidebar
                header={<h1>My Header</h1>}
                footer={<h2>My Footer</h2>}
            />,
        )
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: 'My Header',
            }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', {
                level: 2,
                name: 'My Footer',
            }),
        ).toBeInTheDocument()
    })
})
