import { cn } from '@/lib/utils'

export type BadgeVariant = 'danger' | 'info' | 'success' | 'warning'
export type BadgeSize = 'large' | 'small'
export type BadgeIconPosition = 'left' | 'right'

export type BadgeProps = {
    rounded?: boolean
    icon?: React.ReactNode
    iconPosition?: BadgeIconPosition
    variant?: BadgeVariant
    size?: BadgeSize
} & React.HTMLAttributes<HTMLDivElement>

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'success',
    rounded = false,
    className,
    icon = null,
    iconPosition = 'left',
    size = 'small',
    ...props
}) => (
    <div
        className={cn(
            'nt-badge',
            `nt-badge-${variant}`,
            `nt-badge-${size}`,
            { 'nt-badge-rounded': rounded },
            className,
        )}
        {...props}
    >
        {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
        )}
    </div>
)

Badge.displayName = 'Badge'

export { Badge }
