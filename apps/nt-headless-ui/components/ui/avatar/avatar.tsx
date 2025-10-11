import { cn } from '@/lib/utils'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitiveRoot
} from '../../radix/avatar'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'
export type AvatarRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type AvatarProps = {
    className?: string
    src?: string
    fallBack?: React.ReactNode
    hasBadge?: boolean
    size?: AvatarSize
    badgeClass?: string
    status?: AvatarStatus
    radius?: AvatarRadius
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>

export const Avatar = ({
    src,
    fallBack,
    hasBadge = false,
    className = '',
    size = 'xs',
    badgeClass = '',
    status = 'online',
    radius = 'full',
    ...args
}: AvatarProps) => (
    <AvatarPrimitiveRoot
        className={cn('nt-avatar-wrapper-' + size, className)}
        {...args}
    >
        <AvatarImage
            className={cn(
                'nt-avatar',
                'nt-avatar-' + size,
                'nt-avatar-radius-' + radius
            )}
            src={src}
        />
        <AvatarFallback>{fallBack || null}</AvatarFallback>
        {hasBadge && (
            <span
                role="presentation"
                className={cn(
                    'nt-avatar-status',
                    'nt-avatar-status-' + status,
                    badgeClass
                )}
            />
        )}
    </AvatarPrimitiveRoot>
)

export default Avatar
