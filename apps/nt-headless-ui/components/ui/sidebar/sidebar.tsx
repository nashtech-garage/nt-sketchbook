import {
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    Sidebar as SidebarRadix,
    SidebarTrigger,
} from '@headless-ui/components/radix/sidebar'
import React from 'react'

import { SidebarGroup } from './components/sidebar-group'

export type SidebarSubItem = {
    title: string
    icon?: React.ComponentType
    active?: boolean
}

export type SidebarItem = {
    title: string
    url?: string
    icon?: React.ComponentType
    active?: boolean
    trailingBadge?: React.ReactNode
    subItems?: SidebarSubItem[]
}

export type Group = {
    label: string
    items: SidebarItem[]
}

export type SidebarProps = {
    groups?: Group[]
    isToggleSideBar?: boolean
    side?: 'left' | 'right'
    header?: React.ReactNode
    footer?: React.ReactNode
}

export const Sidebar = (props: SidebarProps) => {
    const {
        groups = [],
        isToggleSideBar = true,
        side = 'left',
        header = null,
        footer = null,
    } = props
    return (
        <SidebarProvider>
            <SidebarRadix side={side}>
                {header && <SidebarHeader>{header}</SidebarHeader>}

                <SidebarContent>
                    {groups.map((group: Group, key: number) => (
                        <SidebarGroup
                            key={group.label}
                            className={
                                key === groups.length - 1
                                    ? 'border-b-0'
                                    : ''
                            }
                            group={group}
                        />
                    ))}
                </SidebarContent>
                {footer && <SidebarFooter>{footer}</SidebarFooter>}
            </SidebarRadix>
            <main>{isToggleSideBar && <SidebarTrigger />}</main>
        </SidebarProvider>
    )
}
