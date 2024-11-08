import { type ButtonHTMLAttributes, useMemo } from 'react'

import { Theme } from '@/types'
import { combineClasses } from '@/utils/tailwind'
import { isPrimaryTheme } from '@/utils/theme'

type ButtonProps = {
    label?: string
    children?: React.ReactNode
    className?: string
    isDisabled?: boolean
    theme?: Theme
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
    const {
        label,
        isDisabled = false,
        onClick,
        className = '',
        children,
        theme = 'default',
        ...restProps
    } = props

    const bgTheme = useMemo(() => {
        if (isPrimaryTheme(theme)) {
            return 'bg-primary hover:bg-primary-hover'
        }
        return 'bg-success hover:bg-green-hover'
    }, [theme])

    return (
        <button
            {...restProps}
            className={combineClasses(
                'transition-colors px-6 py-2 rounded-md text-sm text-white ',
                bgTheme,
                className,
                {
                    'bg-gray-300 text-slate-600 cursor-not-allowed pointer-events-none':
                        isDisabled,
                },
            )}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
            {label}
        </button>
    )
}

export type { ButtonProps }
