import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'danger' | 'info' | 'success' | 'warning'
export type BadgeSize = 'large' | 'small'
export type BadgeIconPosition = 'left' | 'right'

export type BadgeProps = {
    icon?: ReactNode
    iconPosition?: BadgeIconPosition
    rounded?: boolean
    size?: BadgeSize
    variant?: BadgeVariant
} & HTMLAttributes<HTMLDivElement>

export const Badge = ({
    children,
    variant = 'success',
    rounded = false,
    className,
    icon = null,
    iconPosition = 'left',
    size = 'small',
    ...props
}: BadgeProps) => (
    <div
        className={cn(
            'nt-badge',
            `nt-badge-${variant}`,
            `nt-badge-${size}`,
            { 'nt-badge-rounded': rounded },
            className
        )}
        {...props}>
        {icon && iconPosition === 'left' && (
            <span className="nt-mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
            <span className="nt-ml-2">{icon}</span>
        )}
    </div>
)

Badge.displayName = 'Badge'

export default Badge
