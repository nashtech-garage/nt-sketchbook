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

type Group = {
    label: string
    items: {
        title: string
        url: string
        icon?: React.ComponentType
    }[]
}

type SidebarProps = {
    groups?: Group[]
    isToggleSideBar?: boolean
}

export const Sidebar = (props: SidebarProps) => {
    const { groups = [], isToggleSideBar = true } = props
    return (
        <SidebarProviderRadix>
            <SidebarRadix>
                <SidebarContentRadix>
                    {groups.map((group: Group) => (
                        <SidebarGroupRadix key={group.label}>
                            <SidebarGroupLabelRadix>
                                {group.label}
                            </SidebarGroupLabelRadix>
                            <SidebarGroupContentRadix>
                                <SidebarMenuRadix>
                                    {group.items.map((item) => (
                                        <SidebarMenuItemRadix
                                            key={item.title}
                                        >
                                            <SidebarMenuButtonRadix
                                                asChild
                                            >
                                                <a href={item.url}>
                                                    {item.icon && (
                                                        <item.icon />
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
