import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { type ComponentProps } from 'react'

export type BreadcrumbItem = ComponentProps<typeof Link> & {
    label: string
}

export type BreadCrumbProps = React.HTMLAttributes<HTMLElement> & {
    items: BreadcrumbItem[]
}

export const Breadcrumb = React.forwardRef<
    HTMLElement,
    BreadCrumbProps
>(({ items, className, ...props }, ref) => (
    <nav
        ref={ref}
        className={cn('nt-breadcrumb', className)}
        {...props}
    >
        <ol className="nt-breadcrumb-list">
            {items.map(({ className, ...item }, idx) => {
                const isLast = idx === items.length - 1
                return (
                    <>
                        <li
                            className="nt-breadcrumb-list-item"
                            key={item.id + '-list-item'}
                        >
                            {item.href && !isLast ? (
                                <Link
                                    className={cn(
                                        className,
                                        'nt-breadcrumb-list-item-link'
                                    )}
                                    {...item}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={cn(
                                        className,
                                        'nt-breadcrumb-list-item-current'
                                    )}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    </>
                )
            })}
        </ol>
    </nav>
))

export default Breadcrumb
