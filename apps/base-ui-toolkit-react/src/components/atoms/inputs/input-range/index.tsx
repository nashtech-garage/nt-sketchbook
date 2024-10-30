import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { combineClasses } from '@/utils/tailwind'

export type InputRangeProps = {
    className?: string
    registerHookForm?: UseFormRegisterReturn
    size?: 'lg' | 'md' | 'sm'
    color?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
} & InputHTMLAttributes<HTMLInputElement>

const sizeClasses = {
    lg: 'h-8 w-48',
    md: 'h-6 w-36',
    sm: 'h-4 w-24',
}

export const InputRange = (props: InputRangeProps) => {
    const {
        className = '',
        size = 'md',
        registerHookForm,
        ...restProps
    } = props

    const sizeClass = sizeClasses[size] || sizeClasses.md

    return (
        <input
            className={combineClasses(
                'cursor-grabbing',
                sizeClass,
                className,
            )}
            type="range"
            {...restProps}
            {...registerHookForm}
        />
    )
}
