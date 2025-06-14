import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export type LabelVariant = 'hint' | 'form-field'

export type LabelProps = {
    htmlFor?: string
    children: ReactNode
    className?: string
    variant?: LabelVariant
}

export const Label = ({
    htmlFor,
    children,
    className,
    variant = 'form-field'
}: LabelProps) => {
    return (
        <label
            {...(htmlFor ? { htmlFor } : {})}
            className={cn(
                'nt-label',
                variant === 'hint'
                    ? 'nt-label-hint'
                    : 'nt-label-form-field',
                className
            )}
        >
            {children}
        </label>
    )
}
