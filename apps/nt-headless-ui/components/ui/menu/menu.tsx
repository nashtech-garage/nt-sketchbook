import {
    forwardRef,
    type ChangeEventHandler,
    type CSSProperties,
    type HTMLAttributes,
    type InputHTMLAttributes,
    type ReactNode
} from 'react'

import {
    MenuBadge,
    MenuCheck,
    MenuChevron,
    MenuColorDot,
    MenuDescription,
    MenuEmpty,
    MenuFlag,
    MenuIcon,
    MenuItem,
    MenuLabel,
    MenuList,
    MenuRoot,
    MenuScroll,
    MenuSearch,
    MenuSection,
    MenuShortcut,
    MenuSubmenu,
    type MenuVariant
} from './compound/menu-compound'

export type { MenuVariant }

export type MenuItemConfig = {
    label: ReactNode
    active?: boolean
    badge?: ReactNode
    check?: ReactNode
    chevron?: ReactNode
    color?: string
    colorDot?: ReactNode
    danger?: boolean
    description?: ReactNode
    disabled?: boolean
    endSlot?: ReactNode
    flag?: ReactNode
    href?: string
    icon?: ReactNode
    id?: string
    items?: MenuItemConfig[]
    onClick?: () => void
    shortcut?: ReactNode
    startSlot?: ReactNode
}

export type MenuSectionConfig = {
    items: MenuItemConfig[]
    id?: string
    title?: ReactNode
}

export type MenuSearchConfig = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    icon?: ReactNode
    onChange?: ChangeEventHandler<HTMLInputElement>
    wrapperClassName?: string
}

export type MenuProps = HTMLAttributes<HTMLDivElement> & {
    empty?: ReactNode
    items?: MenuItemConfig[]
    scrollable?: boolean
    search?: MenuSearchConfig
    sections?: MenuSectionConfig[]
    variant?: MenuVariant
}

const hasItems = (items?: MenuItemConfig[]) =>
    Boolean(items && items.length > 0)

const hasSections = (sections?: MenuSectionConfig[]) =>
    Boolean(
        sections &&
            sections.some((section) => section.items.length > 0)
    )

const renderItemContent = (item: MenuItemConfig) => (
    <>
        {item.startSlot}
        {item.icon && <MenuIcon>{item.icon}</MenuIcon>}
        {item.flag && <MenuFlag>{item.flag}</MenuFlag>}
        {(item.color || item.colorDot) && (
            <MenuColorDot
                style={
                    item.color
                        ? ({
                              '--nt-menu-dot-color': item.color
                          } as CSSProperties)
                        : undefined
                }>
                {item.colorDot}
            </MenuColorDot>
        )}
        <MenuLabel>
            {item.label}
            {item.description && (
                <MenuDescription>{item.description}</MenuDescription>
            )}
        </MenuLabel>
        {item.shortcut && (
            <MenuShortcut>{item.shortcut}</MenuShortcut>
        )}
        {item.badge && <MenuBadge>{item.badge}</MenuBadge>}
        {item.check && <MenuCheck>{item.check}</MenuCheck>}
        {item.endSlot}
        {item.items && (
            <MenuChevron>{item.chevron ?? null}</MenuChevron>
        )}
        {!item.items && item.chevron && (
            <MenuChevron>{item.chevron}</MenuChevron>
        )}
    </>
)

const renderItems = (items: MenuItemConfig[]) => (
    <MenuList>
        {items.map((item, index) => (
            <li key={item.id ?? index}>
                <MenuItem
                    active={item.active}
                    as={hasItems(item.items) ? 'div' : 'button'}
                    danger={item.danger}
                    disabled={item.disabled}
                    href={item.href}
                    onClick={item.onClick}>
                    {renderItemContent(item)}
                    {hasItems(item.items) && (
                        <MenuSubmenu>
                            <MenuRoot variant="compact">
                                {renderItems(item.items ?? [])}
                            </MenuRoot>
                        </MenuSubmenu>
                    )}
                </MenuItem>
            </li>
        ))}
    </MenuList>
)

const renderSections = (sections: MenuSectionConfig[]) =>
    sections.map((section, index) => (
        <MenuSection key={section.id ?? index} title={section.title}>
            {renderItems(section.items)}
        </MenuSection>
    ))

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
    (
        {
            children,
            empty = null,
            items,
            scrollable = false,
            search,
            sections,
            variant = 'default',
            ...props
        },
        ref
    ) => {
        const content = children
            ? children
            : hasSections(sections)
            ? renderSections(sections ?? [])
            : hasItems(items)
            ? renderItems(items ?? [])
            : empty && <MenuEmpty>{empty}</MenuEmpty>

        return (
            <MenuRoot ref={ref} variant={variant} {...props}>
                {search && <MenuSearch {...search} />}
                {scrollable ? (
                    <MenuScroll>{content}</MenuScroll>
                ) : (
                    content
                )}
            </MenuRoot>
        )
    }
)
Menu.displayName = 'Menu'

export default Menu
