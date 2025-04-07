import { cn } from '@/lib/utils'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitiveRoot,
} from '../../radix/avatar'

export type AvatarSize = 'extra-small' | 'small' | 'medium' | 'large'
export type BadgePosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

export type AvatarProps = {
    className?: string
    src?: string
    fallBack?: React.ReactNode
    hasBadge?: boolean
    badgePosition?: BadgePosition
    size?: AvatarSize
    badgeClass?: string
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>

const sizeClasses: Record<AvatarSize, string> = {
    'extra-small': 'h-7 w-7',
    small: 'h-10 w-10',
    medium: 'h-20 w-20',
    large: 'h-40 w-40',
}

const positionClasses: Record<
    BadgePosition,
    Record<AvatarSize, string>
> = {
    'top-left': {
        'extra-small': 'top-[5px] left-[-3px]',
        small: 'top-[5px] left-[-4px]',
        medium: 'top-[10px] left-0',
        large: 'top-[10px] left-[18px]',
    },
    'top-right': {
        'extra-small': 'top-[5px] right-[-3px]',
        small: 'top-[5px] right-[-4px]',
        medium: 'top-[10px] right-0',
        large: 'top-[10px] right-[18px]',
    },
    'bottom-left': {
        'extra-small': 'bottom-[5px] left-[-3px]',
        small: 'bottom-[5px] left-[-4px]',
        medium: 'bottom-[10px] left-0',
        large: 'bottom-[10px] left-[18px]',
    },
    'bottom-right': {
        'extra-small': 'bottom-[5px] right-[-3px]',
        small: 'bottom-[5px] right-[-4px]',
        medium: 'bottom-[10px] right-0',
        large: 'bottom-[10px] right-[18px]',
    },
}

const badgeSize: Record<AvatarSize, string> = {
    'extra-small': 'h-2 w-2',
    small: 'h-3 w-3',
    medium: 'h-4 w-4',
    large: 'h-5 w-5',
}

const Avatar = ({
    src,
    fallBack,
    hasBadge = false,
    badgePosition = 'bottom-right',
    className = '',
    size = 'medium',
    badgeClass = '',
    ...args
}: AvatarProps) => (
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
                    'absolute rounded-full bg-primary border border-white',
                    positionClasses[badgePosition][size],
                    badgeSize[size],
                    badgeClass,
                )}
            />
        )}
    </AvatarPrimitiveRoot>
)

export { Avatar }
