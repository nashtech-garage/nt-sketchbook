import { cn } from '@headless-ui/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
    'inline-flex items-center justify-center text-sm font-medium shadow-md',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-white hover:bg-shade-primary-80 active:bg-shade-primary-110 disabled:bg-shade-primary-20 disabled:text-white',
                secondary:
                    'bg-shade-secondary-1 text-white hover:bg-shade-secondary-1-80 active:bg-shade-secondary-1-110 disabled:bg-shade-secondary-1-20 disabled:text-white',
                outline:
                    'border border-primary text-primary hover:shadow active:bg-shade-primary-10 disabled:bg-primary-20 disabled:text-white',
                'outline-secondary':
                    'border border-shade-secondary-1 text-shade-secondary-1 hover:shadow active:bg-shade-secondary-10 disabled:bg-shade-secondary-20 disabled:text-white',
            },
            size: {
                small: 'h-8 px-3 text-xs',
                medium: 'h-9 px-4 py-2 text-sm',
                large: 'h-10 px-8 text-md',
                icon: 'h-9 w-9 p-3',
            },
            rounded: {
                true: 'rounded-full',
                false: 'rounded',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'small',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    rounded?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size = 'small',
            icon = null,
            iconPosition = 'left',
            children,
            rounded = true,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        rounded,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            >
                {icon && iconPosition === 'left' && (
                    <span className="mr-2">{icon}</span>
                )}
                {children}
                {icon && iconPosition === 'right' && (
                    <span className="ml-2">{icon}</span>
                )}
            </button>
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
