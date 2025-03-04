import { Meta, StoryFn } from '@storybook/react'
import { LayoutDashboard, SettingsIcon } from 'lucide-react'
import React from 'react'

import { Sidebar } from './sidebar'

export default {
    title: 'Components/Sidebar',
    component: Sidebar,
    argTypes: {},
    args: {
        groups: [
            {
                label: 'Productivity',
                items: [
                    {
                        title: 'Dashboard',
                        url: '/dashboard',
                        icon: LayoutDashboard,
                    },
                    {
                        title: 'Settings',
                        url: '/settings',
                        icon: SettingsIcon,
                    },
                ],
            },
        ],
    },
} as Meta

const Template: StoryFn<any> = (args: any) => <Sidebar {...args} />

export const Default = Template.bind({})

Default.args = {}
