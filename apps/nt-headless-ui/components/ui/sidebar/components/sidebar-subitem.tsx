import { cn } from '@headless-ui/lib/utils'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import React from 'react'

import {
    SidebarMenuItem,
    SidebarMenuSub,
} from '../../../radix/sidebar'
import { type SidebarItem } from '../sidebar'
import { SideBarItem } from './sidebar-item'

type SideBarSubItemProps = {
    item: SidebarItem
    className: string
}

export const SideBarSubItem = (props: SideBarSubItemProps) => {
    const { item, className } = props

    return (
        <SidebarMenuItem
            className={cn(
                ' p-0  ',
                item.active && 'bg-purple text-white rounded ',
                className,
            )}
        >
            <Collapsible className="group/collapsible ">
                <CollapsibleTrigger
                    className={cn(
                        'justify-between flex items-center',
                        'group/item hover:bg-shade-secondary-1-60',
                        'hover:text-white hover:rounded px-2 py-3',
                        'cursor-pointer w-full',
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
                                        item.active && 'text-white',
                                    ),
                                    size: 17,
                                },
                            )}
                        {item.title}
                    </div>
                    <ChevronDown size={17} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                            <SideBarItem
                                item={subItem}
                                key={subItem.title}
                                className="p-0 pl-8 py-1"
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}
