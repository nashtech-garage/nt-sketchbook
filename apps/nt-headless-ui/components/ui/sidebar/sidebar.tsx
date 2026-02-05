import { cn } from '@/lib/utils'
import {
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
    useState
} from 'react'

export type SlideBarItem = {
    id: string
    label: string
    children?: SlideBarItem[]
    icon?: string
    onClick?: () => void
}

export type SlideBarProps = {
    items: SlideBarItem[]
    brandingText?: string
    defaultOpen?: string[]
    footer?: ReactNode
    logoSrc?: string
    onSearch?: (event: KeyboardEvent<HTMLInputElement>) => void
    version?: string
}

type SlideBarListProps = {
    items: SlideBarItem[]
    toggleMenu: (id: string) => void
    isSecondary?: boolean
    openMenus?: string[]
    toggle?: boolean
    toggleMenuVisibility?: (toggle: boolean) => void
}

const NavbarItemList = ({
    items,
    openMenus = [],
    toggleMenu,
    isSecondary = false,
    toggle,
    toggleMenuVisibility
}: SlideBarListProps) => {
    return (
        <ul
            className={
                isSecondary ? 'nt-navbar-secondary' : 'nt-navbar-list'
            }>
            {items.map(({ id, label, icon, onClick, children }) => {
                const isOpen = openMenus.includes(id)
                const hasChildren = Boolean(children?.length)

                const liClassName = cn(
                    { 'nt-navbar-primary': hasChildren },
                    isSecondary
                        ? 'nt-navbar-secondary-item'
                        : 'nt-navbar-item',
                    { 'active open': isOpen && toggle }
                )

                const handleItemClick = (
                    event: MouseEvent<HTMLLIElement>
                ) => {
                    if (!toggle && hasChildren)
                        toggleMenuVisibility?.(true)

                    if (hasChildren) toggleMenu(id)
                    else {
                        event.stopPropagation()
                        onClick?.()
                    }
                }

                return (
                    <li
                        key={id}
                        className={liClassName}
                        onClick={handleItemClick}>
                        {hasChildren ? (
                            <div className="nt-navbar-link">
                                {icon && (
                                    <span
                                        className={cn('nti', icon)}
                                    />
                                )}
                                <a>{label}</a>
                                <span className="nt-navbar-item-icon nti nti-chevron-right" />
                            </div>
                        ) : (
                            <>
                                {icon && (
                                    <span
                                        className={cn('nti', icon)}
                                    />
                                )}
                                <a>{label}</a>
                            </>
                        )}

                        {hasChildren && isOpen && (
                            <NavbarItemList
                                items={children ?? []}
                                openMenus={openMenus}
                                toggleMenu={toggleMenu}
                                isSecondary
                            />
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export const Sidebar = ({
    logoSrc = '',
    items,
    defaultOpen = [],
    footer = null,
    onSearch
}: SlideBarProps) => {
    const [toggle, setToggle] = useState(true)
    const [openMenus, setOpenMenus] = useState<string[]>(defaultOpen)

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) =>
            prev.includes(id)
                ? prev.filter((menuId) => menuId !== id)
                : [...prev, id]
        )
    }

    const toggleMenuVisibility = () => {
        setToggle((prev) => !prev)
    }

    return (
        <nav
            className={`nt-navbar ${toggle ? 'open' : ''}`}
            aria-label="Sidebar">
            <div className="nt-navbar-header">
                <div className="nt-navbar-header-logo">
                    <img alt="logo" src={logoSrc} />
                </div>
                <div className="nt-navbar-header-buttons">
                    <i
                        className="nti nti-menu"
                        role="button"
                        tabIndex={0}
                        aria-label="Toggle menu"
                        onClick={toggleMenuVisibility}
                    />
                    <i className="nti nti-bell" />
                </div>
            </div>

            {onSearch && (
                <input
                    type="text"
                    className="nt-input nt-input-default nt-navbar-search"
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            onSearch(event)
                        }
                    }}
                    placeholder="Search..."
                />
            )}

            <div className="nt-navbar-groups">
                {items.map((group) => (
                    <div key={group.id} className="nt-navbar-group">
                        <p className="nt-navbar-title">
                            {group.label}
                        </p>
                        <NavbarItemList
                            items={group.children ?? []}
                            openMenus={openMenus}
                            toggleMenu={toggleMenu}
                            toggle={toggle}
                            toggleMenuVisibility={setToggle}
                        />
                    </div>
                ))}
            </div>
            {footer && (
                <div className="nt-navbar-footer">{footer}</div>
            )}
        </nav>
    )
}

export default Sidebar
