import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { type ReactNode } from 'react'

export type AlertType = 'info' | 'danger' | 'warning' | 'success'

export type AlertProps = {
    message: string
    className?: string
    icon?: ReactNode
    onClose?: () => void
    showIcon?: boolean
    type?: AlertType
}

export const Alert = (props: AlertProps) => {
    const {
        type = 'info',
        message,
        showIcon = true,
        icon,
        onClose,
        className = ''
    } = props

    return (
        <div
            className={cn(
                'nt-alert',
                `nt-alert-${type}`,
                {
                    'nt-alert-has-icon': showIcon && !icon
                },
                className
            )}
            role="alert">
            {icon && <span className="nt-alert-icon">{icon}</span>}
            <span className="nt-alert-message">{message}</span>
            {onClose && (
                <X
                    className="nt-alert-close"
                    aria-label="Close"
                    height={16}
                    width={16}
                    onClick={onClose}
                />
            )}
        </div>
    )
}

export default Alert
