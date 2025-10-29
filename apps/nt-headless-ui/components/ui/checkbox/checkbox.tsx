import { cn } from '@/lib/utils'
import * as React from 'react'

export type CheckboxProps =
    React.InputHTMLAttributes<HTMLInputElement> & {
        label?: string
        disabled?: boolean
    }

export const Checkbox = React.forwardRef<
    HTMLInputElement,
    CheckboxProps
>(({ className, label, ...props }, ref) => (
    <label
        className={cn(
            'nt-checkbox',
            className,
            props.disabled ? 'disabled' : ''
        )}
    >
        <input ref={ref} type="checkbox" {...props} />
        {label}
    </label>
))

Checkbox.displayName = 'Checkbox'

export default Checkbox
