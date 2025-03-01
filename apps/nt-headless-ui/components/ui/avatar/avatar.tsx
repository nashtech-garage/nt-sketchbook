import { cn } from '@headless-ui/lib/utils'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitive,
    AvatarPrimitiveRoot,
} from '../../radix/avatar'

export type AvatarSize = 'small' | 'medium' | 'large'

export type AvatarProps = {
    className?: string
    src?: string
    fallBack?: React.ReactNode
    badge?: React.ReactNode
    badgePosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
    size?: AvatarSize
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

const Avatar = (props: AvatarProps) => {
    const {
        src,
        fallBack,
        badge,
        badgePosition,
        className = '',
        size = 'medium',
        ...args
    } = props

    const sizeClasses = {
        small: 'h-10 w-10',
        medium: 'h-20 w-20',
        large: 'h-40 w-40',
    }

    const positionClasses = {
        'top-left': 'absolute top-[4px] left-[3px]',
        'top-right': 'absolute top-[4px] right-[3px]',
        'bottom-left': 'absolute bottom-[3px] left-[1px]',
        'bottom-right': 'absolute bottom-[3px] right-[1px]',
    }

    return (
        <AvatarPrimitiveRoot
            className={cn(sizeClasses[size], className)}
            {...args}
        >
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
