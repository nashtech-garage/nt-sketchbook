import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

export type SwitchVariant = 'default' | 'danger' | 'warning'

export type SwitchProps = {
    variant?: SwitchVariant
    className?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (props, ref) => {
        const { className, variant = 'default', ...rest } = props

        return (
            <label
                className={cn(
                    'nt-switch',
                    variant !== 'default' && `nt-switch-${variant}`,
                    className
                )}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    role="switch"
                    className="nt-switch-input"
                    {...rest}
                />
                <span className="nt-switch-slider" />
            </label>
        )
    }
)

Switch.displayName = 'Switch'
