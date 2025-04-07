import {
    SidebarMenuButton as SidebarMenuButtonRadix,
    SidebarMenuItem,
} from '@/components/radix/sidebar'
import { cn } from '@/lib/utils'
import React from 'react'

import type { SidebarItem } from '../sidebar'
import { SideBarSubItem } from './sidebar-subitem'

export type SideBarItemProps = {
    item: SidebarItem
    className?: string
}

export const SideBarItem = (props: SideBarItemProps) => {
    const { item, className = '' } = props

    if ((item.subItems ?? []).length > 0) {
        return <SideBarSubItem item={item} className={className} />
    }

    return (
        <SidebarMenuItem
            key={item.title}
            className={cn(
                'group/item hover:bg-shade-secondary-1-60 hover:text-white hover:rounded ',
                item.active && 'bg-purple text-white rounded ',
                className,
            )}
        >
            <SidebarMenuButtonRadix asChild>
                <a
                    href={item.url}
                    className="flex items-center gap-2 text-inherit justify-between"
                >
                    <div className="gap-2 flex items-center">
                        {item.icon &&
                            React.createElement(
                                item.icon as React.ComponentType<{
                                    className: string
                                    size: number
                                }>,
                                {
                                    className: cn(
                                        'text-purple group-hover/item:text-white',
                                        item.active && 'text-white',
                                    ),
                                    size: 17,
                                },
                            )}
                        <span
                            className={cn(
                                'group-hover/item:text-white',
                                item.active && 'text-white',
                            )}
                        >
                            {item.title}
                        </span>
                    </div>
                    {item.trailingBadge && item.trailingBadge}
                </a>
            </SidebarMenuButtonRadix>
        </SidebarMenuItem>
    )
}
