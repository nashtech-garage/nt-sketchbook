import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-badge text-sm font-medium shadow-md',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-white hover:bg-shade-primary-80 active:bg-shade-primary-110 disabled:bg-shade-primary-20 disabled:text-white',
                seconadry:
                    'bg-shade-secondary-1 text-white hover:bg-shade-secondary-1-80 active:bg-shade-secondary-1-110 disabled:bg-shade-secondary-1-20 disabled:text-white',
                outline:
                    'border border-primary text-primary hover:shadow active:bg-shade-primary-10 disabled:bg-primary-20 disabled:text-white',
                'outline-secondary':
                    'border border-shade-secondary-1 text-shade-secondary-1 hover:shadow active:bg-shade-secondary-10 disabled:bg-shade-secondary-20 disabled:text-white',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-10 px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, asChild = false, ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
