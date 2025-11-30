import type { Meta, StoryFn } from '@storybook/nextjs-vite'
import { type KeyboardEvent } from 'react'

import { Sidebar, type SlideBarProps } from './sidebar'

const sampleItems: SlideBarProps['items'] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        children: [
            {
                id: 'stepone',
                label: 'StepOne',
                icon: 'nti-dashboard'
            },
            { id: 'iot', label: 'IoT', icon: 'nti-iot' },
            {
                id: 'commerce',
                label: 'e-Commerce',
                icon: 'nti-cart'
            }
        ]
    },
    {
        id: 'features',
        label: 'Features',
        children: [
            {
                id: 'auth',
                label: 'Auth',
                icon: 'nti-shapes',
                children: [
                    { id: 'login', label: 'Login' },
                    { id: 'register', label: 'Register' }
                ]
            },
            {
                id: 'widgets',
                label: 'Widgets - v1.0.0',
                icon: 'nti-widgets',
                children: [
                    { id: 'alert', label: 'Alert' },
                    { id: 'avatar', label: 'Avatar' },
                    { id: 'badge', label: 'Badge' }
                ]
            }
        ]
    }
]

export default {
    title: 'Components/SlideBar',
    component: Sidebar,
    argTypes: {},
    args: {
        onSearch: (event: KeyboardEvent<HTMLInputElement>) =>
            alert(event.currentTarget.value),
        logoSrc: '/assets/images/nashtech-logo.svg',
        items: sampleItems,
        footer: (
            <div className="flex">
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/images/nashtech-logo.svg"
                        width="40"
                    />
                    <div className="flex flex-col text-sm text-shade-neutral-70">
                        <span>Powered by</span>
                        <span>Nashtech Accelerators</span>
                    </div>
                </div>
            </div>
        )
    }
} as Meta

const Template: StoryFn<SlideBarProps> = (args: SlideBarProps) => (
    <Sidebar {...args} />
)

export const Default: StoryFn<SlideBarProps> = Template.bind({})

Default.args = {}
