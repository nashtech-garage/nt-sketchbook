import {
    SidebarMenuButton as SidebarMenuButtonRadix,
    SidebarMenuItem,
    SidebarMenuSub,
} from '@headless-ui/components/radix/sidebar'
import { cn } from '@headless-ui/lib/utils'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import React from 'react'

import { SidebarItem } from '../sidebar'

export type SideBarItemProps = {
    item: SidebarItem
    className?: string
}

export const SideBarItem = (props) => {
    const { item, className = '' } = props

    if (item.subItems?.length > 0) {
        return (
            <SidebarMenuItem
                className={cn(
                    'group/item hover:bg-shade-secondary-1-60 hover:text-white hover:rounded ',
                    item.active && 'bg-purple text-white rounded ',
                    className,
                )}
            >
                <Collapsible
                    defaultOpen
                    className="group/collapsible "
                >
                    <div
                        className={cn(
                            ' justify-between flex items-center',
                            'cursor-pointer',
                        )}
                    >
                        <div className="flex gap-2 w-[90%]">
                            {item.icon &&
                                React.createElement(
                                    item.icon as React.ComponentType<{
                                        className: string
                                        size: number
                                    }>,
                                    {
                                        className: cn(
                                            'text-purple text-sm group-hover/item:text-white',
                                            item.active &&
                                                'text-white',
                                        ),
                                        size: 17,
                                    },
                                )}
                            {item.title}
                        </div>
                        <CollapsibleTrigger asChild>
                            <ChevronDown size={17} />
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                                <SideBarItem
                                    item={subItem}
                                    key={subItem.title}
                                    className="p-0"
                                />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenuItem>
        )
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
                    // href={item.url}
                    className="flex items-center gap-2 text-inherit "
                >
                    {item.icon &&
                        React.createElement(
                            item.icon as React.ComponentType<{
                                className: string
                            }>,
                            {
                                className: cn(
                                    'text-purple group-hover/item:text-white',
                                    item.active && 'text-white',
                                ),
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
                </a>
            </SidebarMenuButtonRadix>
        </SidebarMenuItem>
    )
}
