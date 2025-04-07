import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

export type CheckboxProps = React.ElementRef<
    typeof CheckboxPrimitive.Root
> & {
    size?: 'small' | 'medium' | 'large'
    variant?: 'blue' | 'black'
}

const Checkbox = React.forwardRef<
    CheckboxProps,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        size?: 'small' | 'medium' | 'large'
        variant?: 'blue' | 'black'
    }
>(
    (
        { className, size = 'medium', variant = 'black', ...props },
        ref,
    ) => {
        const sizeClasses = {
            small: 'h-4 w-4',
            medium: 'h-5 w-5',
            large: 'h-6 w-6',
        }
        const checkBoxSizeClasses = {
            small: 'h-3 w-3',
            medium: 'h-4 w-4',
            large: 'h-5 w-5',
        }

        const variantClasses = {
            blue: 'border-info data-[state=checked]:bg-info dark:data-[state=checked]:text-info dark:data-[state=checked]:bg-info',
            black: 'border-black data-[state=checked]:bg-black dark:data-[state=checked]:text-black dark:data-[state=checked]:bg-black',
        }

        return (
            <CheckboxPrimitive.Root
                ref={ref}
                className={cn(
                    'peer rounded-sm border-[2px]',
                    'focus-visible:outline-none focus-visible:ring-1',
                    'disabled:cursor-not-allowed disabled:opacity-50 ',
                    sizeClasses[size],
                    variantClasses[variant],
                    className,
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    className={cn(
                        'flex items-center justify-center text-current',
                    )}
                >
                    <Check
                        className={`${checkBoxSizeClasses[size]} text-white `}
                    />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
        )
    },
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
