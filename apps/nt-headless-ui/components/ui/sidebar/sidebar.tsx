import {
    SidebarContent as SidebarContentRadix,
    SidebarGroupContent as SidebarGroupContentRadix,
    SidebarGroupLabel as SidebarGroupLabelRadix,
    SidebarGroup as SidebarGroupRadix,
    SidebarMenuButton as SidebarMenuButtonRadix,
    SidebarMenuItem as SidebarMenuItemRadix,
    SidebarMenu as SidebarMenuRadix,
    SidebarProvider as SidebarProviderRadix,
    Sidebar as SidebarRadix,
    SidebarTrigger,
} from '@headless-ui/components/radix/sidebar'
import { cn } from '@share/apps/nt-headless-ui/lib/utils'
import React from 'react'

type Group = {
    label: string
    items: {
        title: string
        url: string
        icon?: React.ComponentType
        active?: boolean
    }[]
}

type SidebarProps = {
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
                        <SidebarGroupRadix
                            key={group.label}
                            className={
                                key === groups.length - 1
                                    ? 'border-b-0'
                                    : ''
                            }
                        >
                            <SidebarGroupLabelRadix>
                                {group.label}
                            </SidebarGroupLabelRadix>
                            <SidebarGroupContentRadix>
                                <SidebarMenuRadix>
                                    {group.items.map((item) => (
                                        <SidebarMenuItemRadix
                                            key={item.title}
                                            className={cn(
                                                'group/item hover:bg-shade-secondary-1-60 hover:!text-white hover:rounded-sm ',
                                                item.active &&
                                                    'bg-purple text-white rounded-sm',
                                            )}
                                        >
                                            <SidebarMenuButtonRadix
                                                asChild
                                            >
                                                <a
                                                    href={item.url}
                                                    className="flex items-center gap-2 text-inherit "
                                                >
                                                    {item.icon &&
                                                        React.createElement(
                                                            item.icon as React.ComponentType<{
                                                                className: string
                                                            }>,
                                                            {
                                                                className:
                                                                    cn(
                                                                        'text-purple group-hover/item:text-white',
                                                                        item.active &&
                                                                            'text-white',
                                                                    ),
                                                            },
                                                        )}
                                                    <span>
                                                        {item.title}
                                                    </span>
                                                </a>
                                            </SidebarMenuButtonRadix>
                                        </SidebarMenuItemRadix>
                                    ))}
                                </SidebarMenuRadix>
                            </SidebarGroupContentRadix>
                        </SidebarGroupRadix>
                    ))}
                </SidebarContentRadix>
            </SidebarRadix>
            <main>{isToggleSideBar && <SidebarTrigger />}</main>
        </SidebarProviderRadix>
    )
}
