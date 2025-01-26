import { cn } from '@headless-ui/lib/utils'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'

const AvatarPrimitiveRoot = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn('relative flex h-20 w-20 shrink-0 ', className)}
        {...props}
    />
))

AvatarPrimitiveRoot.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        alt="img"
        className={cn(
            'aspect-square h-full w-full  rounded-full',
            className,
        )}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted border',
            className,
        )}
        {...props}
    />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export interface AvatarProps
    extends React.ComponentPropsWithoutRef<
        typeof AvatarPrimitive.Root
    > {
    src?: string
    fallBack?: React.ReactNode
    badge?: React.ReactNode
    badgePosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
}

const Avatar = (props: AvatarProps) => {
    const { src, fallBack, badge, badgePosition, ...args } = props

    const positionClasses = {
        'top-left': 'absolute top-[4px] left-[3px]',
        'top-right': 'absolute top-[4px] right-[3px]',
        'bottom-left': 'absolute bottom-[3px] left-[1px]',
        'bottom-right': 'absolute bottom-[3px] right-[1px]',
    }

    return (
        <AvatarPrimitiveRoot {...args}>
            <AvatarImage src={src} />
            <AvatarFallback>{fallBack || null}</AvatarFallback>
            {badge && (
                <span
                    className={cn(
                        'h-4 w-4 rounded-full bg-primary border border-white',
                        positionClasses[badgePosition!],
                    )}
                >
                    {badge}
                </span>
            )}
        </AvatarPrimitiveRoot>
    )
}

export { Avatar }
