import { cn } from '@/lib/utils'
import React, {
    type ReactNode,
    useEffect,
    useRef,
    useState
} from 'react'

type Placement = 'up' | 'down' | 'left' | 'right'

type DropdownItem = {
    label?: ReactNode
    danger?: boolean
    active?: boolean
    divider?: boolean
    onClick?: () => void
}

export type DropdownProps = {
    label?: ReactNode
    placement?: Placement
    className?: string
    children?: ReactNode
    items: DropdownItem[]
}
export const Dropdown = ({
    label = 'Dropdown',
    placement = 'down',
    className,
    items,
    children = null
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const buttonId = useRef(
        `dropdown-btn-${Math.random().toString(36).slice(2)}`
    )
    const menuId = useRef(
        `dropdown-menu-${Math.random().toString(36).slice(2)}`
    )

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () =>
            document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div
            ref={dropdownRef}
            className={cn(
                'nt-dropdown',
                isOpen && 'is-open',
                `is-${placement}`,
                children && 'nt-split-button',
                className
            )}
        >
            {children}

            <button
                id={buttonId.current}
                className={cn(
                    'nt-button nt-button-primary',
                    children && 'nt-dropdown-toggle nt-rounded-top-0'
                )}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={menuId.current}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {label}
            </button>

            <ul
                id={menuId.current}
                className="nt-dropdown-menu"
                role="menu"
                aria-labelledby={buttonId.current}
                hidden={!isOpen}
            >
                {items.map((item, index) => (
                    <li
                        key={index}
                        role={item.divider ? 'separator' : 'menuitem'}
                    >
                        {item.divider ? (
                            <hr className="nt-dropdown-menu-divider" />
                        ) : (
                            <a
                                role="menuitem"
                                tabIndex={-1}
                                className={cn(
                                    'nt-dropdown-menu-item',
                                    item.active && 'active',
                                    item.danger && 'danger'
                                )}
                                onClick={() => {
                                    item.onClick?.()
                                    setIsOpen(false)
                                }}
                            >
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown
