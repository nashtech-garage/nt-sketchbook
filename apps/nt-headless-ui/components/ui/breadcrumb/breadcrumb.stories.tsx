import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Breadcrumb } from './breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
    args: {
        items: [
            { id: 'home', label: 'Home', href: '#' },
            { id: 'products', label: 'Products', href: '#' },
            {
                id: 'electronics',
                label: 'Electronics',
                href: '#'
            },
            {
                id: 'smartphones',
                label: 'Smartphones',
                href: '#'
            },
            { id: 'latest', label: 'Latest', href: '/latest' }
        ]
    }
}
