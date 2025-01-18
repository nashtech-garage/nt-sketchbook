import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const badgeVariants = cva(
    'inline-flex items-center hover:cursor-pointer px-2.5 py-1.5',
    {
        variants: {
            variant: {
                default: 'text-white bg-success text-xs',
                danger: 'text-white bg-danger text-xs',
                warning: 'text-white bg-warning text-xs',
                info: 'text-white bg-info text-xs',
                silver: 'text-black bg-secondary-6 text-xs',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    rounded?: boolean
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant,
    rounded = true,
    className,
    icon = null,
    iconPosition = 'left',
    ...props
}) => {
    return (
        <div
            className={cn(
                badgeVariants({ variant }),
                rounded ? 'rounded-full' : 'rounded-md',
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
}

Badge.displayName = 'Badge'

export { Badge }
