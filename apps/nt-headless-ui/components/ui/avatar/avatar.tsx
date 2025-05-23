import { cn } from '@/lib/utils'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitiveRoot,
} from '../../radix/avatar'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export type AvatarProps = {
    className?: string
    src?: string
    fallBack?: React.ReactNode
    hasBadge?: boolean
    size?: AvatarSize
    badgeClass?: string
    status?: AvatarStatus
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>

const Avatar = ({
    src,
    fallBack,
    hasBadge = false,
    className = '',
    size = 'xs',
    badgeClass = '',
    status = 'online',
    ...args
}: AvatarProps) => (
    <AvatarPrimitiveRoot
        className={cn('nt-avatar-wrapper-' + size, className)}
        {...args}
    >
        <AvatarImage
            className={cn('nt-avatar', 'nt-avatar-' + size)}
            src={src}
        />
        <AvatarFallback>{fallBack || null}</AvatarFallback>
        {hasBadge && (
            <span
                role="presentation"
                className={cn(
                    'nt-avatar-status',
                    'nt-avatar-status--' + status,
                    badgeClass,
                )}
            />
        )}
    </AvatarPrimitiveRoot>
)

export { Avatar }
