import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import {
    AvatarFallback,
    AvatarImage,
    AvatarPrimitiveRoot
} from '../../radix/avatar'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'
export type AvatarRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type AvatarProps = {
    badgeClass?: string
    className?: string
    fallBack?: ReactNode
    hasBadge?: boolean
    radius?: AvatarRadius
    size?: AvatarSize
    src?: string
    status?: AvatarStatus
} & ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>

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
        {...args}>
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
