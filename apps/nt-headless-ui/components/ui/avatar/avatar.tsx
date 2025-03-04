import { cn } from '@headless-ui/lib/utils'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitive,
    AvatarPrimitiveRoot,
} from '../../radix/avatar'

export type AvatarSize = 'extra-small' | 'small' | 'medium' | 'large'

export type AvatarProps = {
    className?: string
    src?: string
    fallBack?: React.ReactNode
    hasBadge?: boolean
    badgePosition?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
    size?: AvatarSize
    badgeClass?: string
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

const Avatar = (props: AvatarProps) => {
    const {
        src,
        fallBack,
        hasBadge = false,
        badgePosition = 'bottom-right',
        className = '',
        size = 'medium',
        badgeClass = '',
        ...args
    } = props

    const sizeClasses = {
        'extra-small': 'h-7 w-7',
        small: 'h-10 w-10',
        medium: 'h-20 w-20',
        large: 'h-40 w-40',
    }

    const positionClasses = {
        'top-left': 'absolute top-[4px] left-[3px]',
        'top-right': 'absolute top-[4px] right-[3px]',
        'bottom-left': 'absolute bottom-[3px] left-[1px]',
        'bottom-right': 'absolute bottom-[10px] right-[18px]',
    }

    const badgeSize = {
        'extra-small': 'h-2 w-2',
        small: 'h-3 w-3',
        medium: 'h-4 w-4',
        large: 'h-5 w-5',
    }

    return (
        <AvatarPrimitiveRoot
            className={cn(sizeClasses[size], className)}
            {...args}
        >
            <AvatarImage src={src} />
            <AvatarFallback>{fallBack || null}</AvatarFallback>
            {hasBadge && (
                <span
                    role="presentation"
                    className={cn(
                        'h-4 w-4 rounded-full bg-primary border border-white',
                        positionClasses[badgePosition!],
                        badgeSize[size],
                        badgeClass,
                    )}
                >
                    <span className="px-1 rounded" />
                </span>
            )}
        </AvatarPrimitiveRoot>
    )
}

export { Avatar }
