import { Meta, StoryFn } from '@storybook/react'
import {
    Blocks,
    Check,
    LayoutDashboard,
    SettingsIcon,
    User2,
    UsersRound,
} from 'lucide-react'
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
                        active: true,
                    },
                ],
            },
            {
                label: 'User & Account',
                items: [
                    {
                        title: 'User management',
                        url: '/account',
                        icon: User2,
                    },
                    {
                        title: 'Role & Permissions',
                        url: '/permission',
                        icon: Check,
                    },
                ],
            },
            {
                label: 'App Features',
                items: [
                    {
                        title: 'Features',
                        url: '/features',
                        icon: UsersRound,
                    },
                    {
                        title: 'Widgets',
                        url: '/widgets',
                        icon: Blocks,
                    },
                ],
            },
        ],
    },
} as Meta

const Template: StoryFn<any> = (args: any) => <Sidebar {...args} />

export const Default = Template.bind({})

Default.args = {}
