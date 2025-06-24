import { type ReactNode } from 'react'

export type LabelProps = {
    htmlFor: string
    children: ReactNode
    className?: string
}

export const Label = ({
    htmlFor,
    children,
    className,
}: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    )
}
