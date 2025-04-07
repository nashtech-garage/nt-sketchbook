import type { Meta, StoryFn } from '@storybook/react'
import {
    Blocks,
    Check,
    LayoutDashboard,
    Search,
    SettingsIcon,
    User2,
    UsersRound,
} from 'lucide-react'
import React from 'react'

import { Avatar } from '../avatar/avatar'
import { Badge } from '../badge/badge'
import { Input } from '../input/input'
import type { SidebarProps } from './sidebar'
import { Sidebar } from './sidebar'

export default {
    title: 'Components/Menu sidebar',
    component: Sidebar,
    argTypes: {},
    args: {
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
        ),
        header: (
            <div className="flex-col flex gap-4 mt-5">
                <div className="w-full justify-between flex items-center">
                    <img
                        src="/assets/images/stepone.png"
                        alt="logo"
                    />
                    <Avatar
                        src="/assets/images/image.png"
                        size="small"
                        hasBadge
                        badgeClass="bg-success"
                    />
                </div>
                <Input
                    placeholder="Search app"
                    rightIcon={<Search size={17} />}
                />
            </div>
        ),
        groups: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutDashboard,
                trailingBadge: <Badge variant="danger">4</Badge>,
            },
            {
                title: 'Productivity',
                items: [
                    {
                        title: 'Settings',
                        url: '/settings',
                        icon: SettingsIcon,
                        trailingBadge: <Badge>2</Badge>,
                    },
                ],
            },
            {
                title: 'User & Account',
                items: [
                    {
                        title: 'User management',
                        icon: User2,
                        subItems: [
                            {
                                title: 'Users',
                                url: '/users',
                                active: true,
                            },
                            {
                                title: 'Roles',
                                url: '/roles',
                            },
                        ],
                    },
                    {
                        title: 'Role & Permissions',
                        url: '/permission',
                        icon: Check,
                    },
                ],
            },
            {
                title: 'App Features',
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

const Template: StoryFn<SidebarProps> = (args: SidebarProps) => (
    <Sidebar {...args} />
)

export const Default = Template.bind({})

Default.args = {}
