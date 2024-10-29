import { type InputHTMLAttributes, useMemo } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type TypeVariant =
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'

type TypographyProps = {
    children: React.ReactNode
    level?: number
    className?: string
    variant?: TypeVariant
} & InputHTMLAttributes<HTMLInputElement>

export const Typography = (props: TypographyProps) => {
    const { children, level = 1, className, variant = '' } = props

    const classVariant = useMemo(() => {
        let classResult: string = ''
        if (variant === 'secondary') {
            classResult = 'text-gray-600'
        }

        if (variant === 'success') {
            classResult = 'text-green-600'
        }

        if (variant === 'warning') {
            classResult = 'text-amber-500'
        }

        if (variant === 'danger') {
            classResult = 'text-red-600'
        }
        return classResult
    }, [variant])

    if (level === 2) {
        return (
            <h2 className={combineClasses(classVariant, className)}>
                {children}
            </h2>
        )
    }

    if (level === 3) {
        return (
            <h3 className={combineClasses(classVariant, className)}>
                {children}
            </h3>
        )
    }

    if (level === 4) {
        return (
            <h4 className={combineClasses(classVariant, className)}>
                {children}
            </h4>
        )
    }

    if (level === 5) {
        return (
            <h5 className={combineClasses(classVariant, className)}>
                {children}
            </h5>
        )
    }

    return (
        <h1 className={combineClasses(classVariant, className)}>
            {children}
        </h1>
    )
}
