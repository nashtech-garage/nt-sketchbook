import {
    SidebarGroupContent as SidebarGroupContentRadix,
    SidebarGroupLabel as SidebarGroupLabelRadix,
    SidebarGroup as SidebarGroupRadix,
    SidebarMenu,
} from '@/components/radix/sidebar'

import type { Group, SidebarItem } from '../sidebar'
import { SideBarItem } from './sidebar-item'

type SidebarGroupProps = {
    group: Group
    className?: string
}

export const SidebarGroup = (props: SidebarGroupProps) => {
    const { group, className = '' } = props

    if (group.items === undefined) {
        return (
            <div className=" mt-4 border-b pb-5">
                <SideBarItem
                    className="list-none"
                    item={group as SidebarItem}
                />
            </div>
        )
    }

    return (
        <SidebarGroupRadix key={group.title} className={className}>
            <SidebarGroupLabelRadix>
                {group.title}
            </SidebarGroupLabelRadix>
            <SidebarGroupContentRadix>
                <SidebarMenu>
                    {group.items?.map((item) => (
                        <SideBarItem key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContentRadix>
        </SidebarGroupRadix>
    )
}
