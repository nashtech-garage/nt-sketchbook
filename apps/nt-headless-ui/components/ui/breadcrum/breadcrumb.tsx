import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { type ComponentProps } from 'react'

export type BreadcrumbItem = ComponentProps<typeof Link> & {
    label: string
}

export interface BreadCrumbProps
    extends React.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[]
    separator?: React.ReactNode
}

const DefaultSeparator = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="24"
        viewBox="0 0 4 24"
        fill="none"
    >
        <path
            d="M0.847203 17.16H0.0072031L3.1512 7.524H3.9912L0.847203 17.16Z"
            fill="#949495"
        />
    </svg>
)

const Icon = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.5 7.5C5.05228 7.5 5.5 7.94772 5.5 8.5V10C5.5 10.5523 5.05228 11 4.5 11H2C1.44772 11 1 10.5523 1 10V8.5C1 7.94772 1.44772 7.5 2 7.5H4.5ZM2 10H4.5V8.5H2V10Z"
            fill="#28292b"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 5.5C10.5523 5.5 11 5.94772 11 6.5V10C11 10.5523 10.5523 11 10 11H7.5C6.94772 11 6.5 10.5523 6.5 10V6.5C6.5 5.94772 6.94772 5.5 7.5 5.5H10ZM7.5 10H10V6.5H7.5V10Z"
            fill="#28292b"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.5 1C5.05228 1 5.5 1.44772 5.5 2V5.5C5.5 6.05228 5.05228 6.5 4.5 6.5H2C1.44772 6.5 1 6.05228 1 5.5V2C1 1.44772 1.44772 1 2 1H4.5ZM2 5.5H4.5V2H2V5.5Z"
            fill="#28292b"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 1C10.5523 1 11 1.44772 11 2V3.5C11 4.05228 10.5523 4.5 10 4.5H7.5C6.94772 4.5 6.5 4.05228 6.5 3.5V2C6.5 1.44772 6.94772 1 7.5 1H10ZM7.5 3.5H10V2H7.5V3.5Z"
            fill="#28292b"
        />
    </svg>
)

const Breadcrumb = React.forwardRef<HTMLElement, BreadCrumbProps>(
    (
        {
            items,
            separator = <DefaultSeparator />,
            className,
            ...props
        },
        ref
    ) => (
        <nav
            ref={ref}
            className={cn('nt-breadcrumb', className)}
            {...props}
        >
            <ol>
                {items.map(({ className, ...item }, idx) => {
                    const isFirst = idx === 0
                    const isLast = idx === items.length - 1
                    return (
                        <>
                            <li
                                className="nt-breadcrumb-item"
                                key={item.id}
                            >
                                {item.href && !isLast ? (
                                    <Link
                                        className={cn(
                                            className,
                                            'nt-breadcrumb-link',
                                            isFirst &&
                                                'nt-breadcrumb-first-link'
                                        )}
                                        {...item}
                                    >
                                        {isFirst && <Icon />}
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={cn(
                                            className,
                                            'nt-breadcrumb-current'
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </li>
                            {!isLast && (
                                <li key={`${item.id}-separator`}>
                                    <span
                                        aria-hidden="true"
                                        className="nt-breadcrumb-separator"
                                    >
                                        {separator}
                                    </span>
                                </li>
                            )}
                        </>
                    )
                })}
            </ol>
        </nav>
    )
)

export { Breadcrumb }
