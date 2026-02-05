import { cn } from '@/lib/utils'

import Avatar, {
    type AvatarProps,
    type AvatarSize
} from '../avatar/avatar'

export type AvatarGroupProps = {
    avatars: AvatarProps[]
    className?: string
    count?: number
    size?: AvatarSize
}

export const AvatarGroup = ({
    avatars,
    size = 'md',
    count,
    className
}: AvatarGroupProps) => {
    return (
        <div
            className={cn('nt-avatar-group', className)}
            role="group">
            {avatars.map((avatar, index) => (
                <Avatar
                    key={index}
                    size={size}
                    className={cn('nt-avatar-wrapper')}
                    {...avatar}
                />
            ))}

            {count && count > 0 && (
                <span
                    className={cn(
                        'nt-avatar-wrapper',
                        'nt-avatar-wrapper-' + size
                    )}>
                    <span
                        className={cn(
                            'nt-avatar',
                            `nt-avatar-${size}`,
                            'nt-avatar-count'
                        )}>
                        {count}+
                    </span>
                </span>
            )}
        </div>
    )
}

export default AvatarGroup
