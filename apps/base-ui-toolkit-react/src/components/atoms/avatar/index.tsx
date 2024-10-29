import { ReactNode, useState } from 'react'
import { IoPerson } from 'react-icons/io5'

import { combineClasses } from '@/utils/tailwind'

export type AvatarProps = {
    classNames?: string
    radius?: 'sm' | 'md' | 'lg' | 'full'
    src?: string
    size?: 'sm' | 'md' | 'lg'
    isBordered?: boolean
    alt?: string
    fallback?: ReactNode
}

export const Avatar = (props: AvatarProps) => {
    const {
        radius = 'full',
        classNames = '',
        src = '',
        size = 'sm',
        isBordered = false,
        alt = 'avatar',
        fallback = null,
    } = props

    const [imgError, setImgError] = useState(false)

    const radiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[radius]

    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
    }[size]

    const borderClasses = isBordered
        ? 'border-[4px] border-gray-300 '
        : ''

    const renderChildren = () => {
        if (fallback) {
            return <div>{fallback}</div>
        }

        if (src && !imgError) {
            return (
                <img
                    src={src}
                    className="w-full h-full object-cover "
                    onError={() => setImgError(true)}
                    alt={alt}
                />
            )
        }

        return (
            <IoPerson
                size={20}
                color="white"
                data-testid="invalid-url"
            />
        )
    }

    return (
        <div
            className={combineClasses(
                'w-10 h-10 overflow-hidden bg-gray-800 flex items-center justify-center text-sm text-white',
                radiusClasses,
                sizeClasses,
                borderClasses,
                classNames,
            )}
            data-testid="avatar"
        >
            {renderChildren()}
        </div>
    )
}
