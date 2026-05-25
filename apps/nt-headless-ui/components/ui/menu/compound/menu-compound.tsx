import { cn } from '@/lib/utils'
import {
    forwardRef,
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type HTMLAttributes,
    type InputHTMLAttributes,
    type MouseEventHandler,
    type ReactNode,
    type Ref
} from 'react'

export type MenuVariant =
    | 'default'
    | 'compact'
    | 'select'
    | 'search'
    | 'sidebar'

export type MenuRootProps = HTMLAttributes<HTMLDivElement> & {
    variant?: MenuVariant
}

export type MenuSectionProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    'title'
> & {
    title?: ReactNode
}

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        active?: boolean
        as?: 'button' | 'div'
        danger?: boolean
        href?: string
    }

export type MenuSearchProps =
    InputHTMLAttributes<HTMLInputElement> & {
        icon?: ReactNode
        wrapperClassName?: string
    }

const variantClassNames: Record<MenuVariant, string> = {
    default: '',
    compact: 'nt-menu-compact',
    select: 'nt-menu-select',
    search: 'nt-menu-search',
    sidebar: 'nt-menu-sidebar'
}

export const MenuRoot = forwardRef<HTMLDivElement, MenuRootProps>(
    ({ className, variant = 'default', ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'nt-menu',
                variantClassNames[variant],
                className
            )}
            {...props}
        />
    )
)
MenuRoot.displayName = 'MenuRoot'

export const MenuSection = forwardRef<
    HTMLDivElement,
    MenuSectionProps
>(({ children, className, title, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('nt-menu-section', className)}
        {...props}>
        {title && <h3 className="nt-menu-title">{title}</h3>}
        {children}
    </div>
))
MenuSection.displayName = 'MenuSection'

export const MenuTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('nt-menu-title', className)}
        {...props}
    />
))
MenuTitle.displayName = 'MenuTitle'

export const MenuList = forwardRef<
    HTMLUListElement,
    HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('nt-menu-list', className)}
        {...props}
    />
))
MenuList.displayName = 'MenuList'

export const MenuItem = forwardRef<
    HTMLButtonElement | HTMLAnchorElement,
    MenuItemProps
>(
    (
        {
            active = false,
            as = 'button',
            children,
            className,
            danger = false,
            href,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const itemClassName = cn(
            'nt-menu-item',
            active && 'is-active',
            danger && 'is-danger',
            className
        )

        if (href) {
            const { disabled, onClick, ...anchorProps } = props
            return (
                <a
                    ref={ref as Ref<HTMLAnchorElement>}
                    aria-disabled={disabled || undefined}
                    className={itemClassName}
                    href={href}
                    onClick={disabled ? undefined : onClick}
                    tabIndex={disabled ? -1 : undefined}
                    {...anchorProps}>
                    {children}
                </a>
            )
        }

        if (as === 'div') {
            const { disabled, onClick, ...divProps } =
                props as HTMLAttributes<HTMLDivElement> & {
                    disabled?: boolean
                }
            return (
                <div
                    ref={ref as Ref<HTMLDivElement>}
                    aria-disabled={disabled || undefined}
                    className={itemClassName}
                    onClick={
                        disabled
                            ? undefined
                            : (onClick as
                                  | MouseEventHandler<HTMLDivElement>
                                  | undefined)
                    }
                    role="menuitem"
                    tabIndex={disabled ? -1 : 0}
                    {...divProps}>
                    {children}
                </div>
            )
        }

        return (
            <button
                ref={ref as Ref<HTMLButtonElement>}
                className={itemClassName}
                type={type}
                {...props}>
                {children}
            </button>
        )
    }
)
MenuItem.displayName = 'MenuItem'

const createMenuPart = <TElement extends HTMLElement>(
    displayName: string,
    classNameRoot: string
) => {
    const Component = forwardRef<TElement, HTMLAttributes<TElement>>(
        ({ className, ...props }, ref) => (
            <span
                ref={ref as Ref<HTMLSpanElement>}
                className={cn(classNameRoot, className)}
                {...props}
            />
        )
    )
    Component.displayName = displayName
    return Component
}

export const MenuIcon = createMenuPart<HTMLSpanElement>(
    'MenuIcon',
    'nt-menu-icon'
)
export const MenuChevron = createMenuPart<HTMLSpanElement>(
    'MenuChevron',
    'nt-menu-chevron'
)
export const MenuCheck = createMenuPart<HTMLSpanElement>(
    'MenuCheck',
    'nt-menu-check'
)
export const MenuLabel = createMenuPart<HTMLSpanElement>(
    'MenuLabel',
    'nt-menu-label'
)
export const MenuShortcut = createMenuPart<HTMLSpanElement>(
    'MenuShortcut',
    'nt-menu-shortcut'
)
export const MenuBadge = createMenuPart<HTMLSpanElement>(
    'MenuBadge',
    'nt-menu-badge'
)
export const MenuFlag = createMenuPart<HTMLSpanElement>(
    'MenuFlag',
    'nt-menu-flag'
)
export const MenuColorDot = createMenuPart<HTMLSpanElement>(
    'MenuColorDot',
    'nt-menu-color-dot'
)

export const MenuDescription = forwardRef<
    HTMLSpanElement,
    HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn('nt-menu-description', className)}
        {...props}
    />
))
MenuDescription.displayName = 'MenuDescription'

export const MenuSubmenu = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('nt-menu-submenu', className)}
        {...props}
    />
))
MenuSubmenu.displayName = 'MenuSubmenu'

export const MenuSearch = forwardRef<
    HTMLInputElement,
    MenuSearchProps
>(({ className, icon, wrapperClassName, ...props }, ref) => (
    <div className={cn('nt-menu-search-field', wrapperClassName)}>
        {icon && <span className="nt-menu-search-icon">{icon}</span>}
        <input
            ref={ref}
            className={cn('nt-menu-search-input', className)}
            type="search"
            {...props}
        />
    </div>
))
MenuSearch.displayName = 'MenuSearch'

export const MenuScroll = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('nt-menu-scroll', className)}
        {...props}
    />
))
MenuScroll.displayName = 'MenuScroll'

export const MenuEmpty = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('nt-menu-empty', className)}
        {...props}
    />
))
MenuEmpty.displayName = 'MenuEmpty'
