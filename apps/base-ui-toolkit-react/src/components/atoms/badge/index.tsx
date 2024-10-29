import { useMemo } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type ColorVariant = 'blue' | 'red' | 'green' | 'yellow'
type BadgeProps = {
    label: string
    variant: ColorVariant
    className?: string
}
export const Badge = (props: BadgeProps) => {
    const { label, variant, className } = props

    const classVariant = useMemo(() => {
        if (variant === 'blue') {
            return 'bg-blue-600 ring-blue-500/10'
        }

        if (variant === 'red') {
            return 'bg-orangeRed-default ring-red-500/10'
        }

        if (variant === 'green') {
            return 'bg-green-default ring-green-500/10'
        }

        if (variant === 'yellow') {
            return 'bg-gold-default ring-gold-500/10'
        }
        return ''
    }, [variant])
    return (
        <span
            className={combineClasses(
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10',
                classVariant,
                className,
            )}
        >
            {label}
        </span>
    )
}
