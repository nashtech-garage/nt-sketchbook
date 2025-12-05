import type { Meta, StoryFn } from '@storybook/nextjs-vite'

import { Breadcrumb, type BreadCrumbProps } from './breadcrumb'

export default {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    argTypes: {} as Meta
}

const Template: StoryFn<BreadCrumbProps> = (
    args: BreadCrumbProps
) => <Breadcrumb {...args} />

export const Primary: StoryFn<BreadCrumbProps> = Template.bind({})
Primary.args = {
    items: [
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
}
