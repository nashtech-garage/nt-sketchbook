import React, { Children, cloneElement, ReactNode } from 'react'

export { BreadcrumbItem } from './breadcrumb-item'

export const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
}

export const variantClasses: Record<
    'solid' | 'bordered' | 'light',
    string
> = {
    solid: 'bg-gray-800 text-white p-2 rounded-md bg-gray-400',
    bordered: 'border border-gray-300 p-2 rounded-md',
    light: 'text-gray-500',
}

export const colorClasses: Record<
    | 'foreground'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger',
    string
> = {
    foreground: 'text-slate-900',
    primary: 'text-blue-700',
    secondary: 'text-zinc-900',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-600',
}

type BreadcrumbsProps = {
    children: ReactNode
    size?: keyof typeof sizeClasses
    variant?: keyof typeof variantClasses
    separator?: ReactNode
    isDisabled?: boolean
    onAction?: (key: React.Key) => void
    color?: keyof typeof colorClasses
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const {
        children,
        size = 'md',
        variant = 'light',
        color = 'primary',
        separator = null,
        isDisabled = false,
        onAction = () => null,
    } = props
    const lastChildIndex = Children.count(children) - 1

    return (
        <nav>
            <ol
                data-testid="breadcrumb"
                className={`flex space-x-2 text-gray-700 ${sizeClasses[size]} ${variantClasses[variant]} ${colorClasses[color]}`}
            >
                {Children.map(children, (child, index) => (
                    <li
                        aria-hidden="true"
                        key={
                            (child as React.ReactElement).key ?? index
                        }
                        onClick={() =>
                            onAction(
                                (child as React.ReactElement).key ??
                                    index,
                            )
                        }
                        className="flex items-center opacity-50"
                    >
                        {cloneElement(child as React.ReactElement, {
                            isDisabled,
                            isCurrent:
                                (child as React.ReactElement).props
                                    .isCurrent ??
                                index === lastChildIndex,
                        })}
                        {index < Children.count(children) - 1 && (
                            <span className="mx-2">
                                {separator || '/'}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
