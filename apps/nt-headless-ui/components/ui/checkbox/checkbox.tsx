import { cn } from '@/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Info, Minus } from 'lucide-react'
import * as React from 'react'

export type CheckboxProps = React.ElementRef<
    typeof CheckboxPrimitive.Root
>

const Checkbox = React.forwardRef<
    CheckboxProps,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        label?: string
        htmlFor?: string
        info?: boolean
    }
>(({ className, label, info, ...props }, ref) => (
    <div className="nt-checkbox-wrapper">
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn('nt-checkbox', className)}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('nt-checkbox-indicator')}
            >
                {props.checked === 'indeterminate' && <Minus />}
                {props.checked === true && <Check />}
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
            <label
                className={`checkbox-label ${
                    props.disabled ? 'disabled' : ''
                }`}
                htmlFor={props.htmlFor}
            >
                {label}
            </label>
        )}
        {info && <Info className="nt-checkbox-info" />}
    </div>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
