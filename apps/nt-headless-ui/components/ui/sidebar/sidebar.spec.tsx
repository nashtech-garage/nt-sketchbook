import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    Sidebar,
    type SlideBarItem,
    type SlideBarProps
} from './sidebar'

const mockSubItem = 'Subitem 1'

const items: SlideBarItem[] = [
    {
        id: 'group1',
        label: 'Group 1',
        children: [
            {
                id: 'item1',
                label: 'Item 1',
                icon: 'icon-1',
                onClick: vi.fn()
            },
            {
                id: 'item2',
                label: 'Item 2',
                children: [
                    {
                        id: 'subitem1',
                        label: mockSubItem,
                        onClick: vi.fn()
                    }
                ]
            }
        ]
    }
]

const setup = (props?: Partial<SlideBarProps>) => {
    const defaultProps: SlideBarProps = {
        logoSrc: 'logo.png',
        items,
        ...props
    }

    return render(<Sidebar {...defaultProps} />)
}

const getParentItem = () => screen.getByText('Item 2')

const toggleParent = async () => {
    await userEvent.click(getParentItem())
}

const getNav = () => screen.getByLabelText('Sidebar')

const toggleSidebar = async () => {
    const nav = getNav()
    const menuIcon = nav.querySelector('.nti-menu') as HTMLElement
    await userEvent.click(menuIcon)
}

describe('Sidebar', () => {
    it('renders logo', () => {
        setup()

        expect(screen.getByAltText('logo')).toHaveAttribute(
            'src',
            'logo.png'
        )
    })

    it('renders group and items', () => {
        setup()

        expect(screen.getByText('Group 1')).toBeInTheDocument()
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(getParentItem()).toBeInTheDocument()
    })

    it('calls onClick for leaf item', async () => {
        setup()

        await userEvent.click(screen.getByText('Item 1'))

        expect(items[0].children?.[0].onClick).toHaveBeenCalled()
    })

    it('toggles submenu on parent click', async () => {
        setup()

        await toggleParent()
        expect(screen.getByText(mockSubItem)).toBeInTheDocument()

        await toggleParent()
        expect(
            screen.queryByText(mockSubItem)
        ).not.toBeInTheDocument()
    })

    it('renders footer', () => {
        setup({ footer: <div>Footer</div> })

        expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('handles search input', async () => {
        const onSearch = vi.fn()

        setup({ onSearch })

        const input = screen.getByPlaceholderText('Search...')
        await userEvent.type(input, '{enter}')

        expect(onSearch).toHaveBeenCalled()
    })

    it('toggles sidebar visibility', async () => {
        setup()

        const nav = getNav()
        expect(nav.className).toContain('open')

        await toggleSidebar()

        expect(nav.className).not.toContain('open')
    })

    it('forces sidebar to open when clicking submenu while closed', async () => {
        setup()

        const nav = getNav()

        await toggleSidebar()
        expect(nav.className).not.toContain('open')

        await toggleParent()

        expect(nav.className).toContain('open')
    })
})
