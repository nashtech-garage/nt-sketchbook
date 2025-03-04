import {
    SidebarGroupContent as SidebarGroupContentRadix,
    SidebarGroupLabel as SidebarGroupLabelRadix,
    SidebarGroup as SidebarGroupRadix,
    SidebarMenu,
} from '@headless-ui/components/radix/sidebar'

import { Group } from '../sidebar'
import { SideBarItem } from './sidebar-item'

type SidebarGroupProps = {
    group: Group
    className?: string
}

export const SidebarGroup = (props: SidebarGroupProps) => {
    const { group, className = '' } = props

    return (
        <SidebarGroupRadix key={group.label} className={className}>
            <SidebarGroupLabelRadix>
                {group.label}
            </SidebarGroupLabelRadix>
            <SidebarGroupContentRadix>
                <SidebarMenu>
                    {group.items.map((item) => (
                        <SideBarItem key={item.title} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContentRadix>
        </SidebarGroupRadix>
    )
}
