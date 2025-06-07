import React, {
    type InputHTMLAttributes,
    type ReactNode,
} from 'react'

import { Label } from '../label/label'

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode
    className?: string
}

export const Radio = ({
    id,
    label,
    className = '',
    ...inputProps
}: RadioProps) => {
    return (
        <Label htmlFor={id!} className={`nt-radio ${className}`}>
            <input id={id} type="radio" {...inputProps} />
            {label}
        </Label>
    )
}
export type RadioDirection = 'column' | 'row'

export type RadioGroupProps = {
    items: RadioProps[]
    className?: string
    direction?: RadioDirection
    ariaLabel?: string
}

export const RadioGroup = ({
    items,
    className = '',
    direction = 'column',
    ariaLabel = 'Radio group',
}: RadioGroupProps) => {
    return (
        <div
            role="group"
            className={`nt-radio-${direction} ${className}`}
            aria-label={ariaLabel}
        >
            {items.map((item) => (
                <Radio key={item.id} {...item} />
            ))}
        </div>
    )
}
