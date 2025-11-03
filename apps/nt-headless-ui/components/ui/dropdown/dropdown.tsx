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
                className={cn(
                    'nt-button nt-button-primary ',
                    children &&
                        'nt-dropdown-toggle nt-button nt-rounded-top-0 nt-button-primary'
                )}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
            </button>

            <ul className="nt-dropdown-menu">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.divider ? (
                            <hr className="nt-dropdown-menu-divider" />
                        ) : (
                            <a
                                type="button"
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
