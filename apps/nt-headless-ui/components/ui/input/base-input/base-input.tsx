import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

export type BaseInputProps = InputHTMLAttributes<HTMLInputElement>

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ className, ...rest }, ref) => {
        return (
            <input
                ref={ref}
                className={cn('nt-input', className)}
                {...rest}
            />
        )
    }
)

BaseInput.displayName = 'BaseInput'
