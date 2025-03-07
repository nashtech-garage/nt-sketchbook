import {
    SidebarContent as SidebarContentRadix,
    SidebarProvider as SidebarProviderRadix,
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
    icon?: React.ComponentType
    active?: boolean
    subItems?: SidebarSubItem[]
}

export type Group = {
    label: string
    items: SidebarItem[]
}

export type SidebarProps = {
    groups?: Group[]
    isToggleSideBar?: boolean
    side: 'left' | 'right'
}

export const Sidebar = (props: SidebarProps) => {
    const {
        groups = [],
        isToggleSideBar = true,
        side = 'left',
    } = props
    return (
        <SidebarProviderRadix>
            <SidebarRadix side={side}>
                <SidebarContentRadix>
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
                </SidebarContentRadix>
            </SidebarRadix>
            <main>{isToggleSideBar && <SidebarTrigger />}</main>
        </SidebarProviderRadix>
    )
}
