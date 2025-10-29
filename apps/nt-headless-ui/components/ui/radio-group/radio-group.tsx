import React, {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode
} from 'react'

import { Label } from '../label/label'

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode
    className?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        { id, label, className = '', ...inputProps }: RadioProps,
        ref
    ) => {
        return (
            <Label htmlFor={id!} className={`nt-radio ${className}`}>
                <input
                    id={id}
                    type="radio"
                    {...inputProps}
                    ref={ref}
                />
                {label}
            </Label>
        )
    }
)

Radio.displayName = 'Radio'

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
    ariaLabel = 'Radio group'
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

export default RadioGroup
