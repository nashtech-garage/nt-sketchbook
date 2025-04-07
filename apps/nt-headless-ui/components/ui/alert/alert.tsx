import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

export type AlertVariant =
    | 'default'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'

const alertVariants = cva(
    'relative w-full rounded px-4 py-3 text-secondary-5 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
    {
        variants: {
            variant: {
                default: 'bg-shade-neutral-9',
                danger: 'bg-danger-thin [&>svg]:text-danger-bold',
                warning: 'bg-warning-thin [&>svg]:text-warning-bold',
                success: 'bg-success-thin [&>svg]:text-success-bold',
                info: 'bg-info-thin [&>svg]:text-info-bold',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

const AlertWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
        VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))

AlertWrapper.displayName = 'Alert'

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            'mb-1 font-medium leading-none tracking-tight text-sm',
            className,
        )}
        {...props}
    />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
    />
))
AlertDescription.displayName = 'AlertDescription'

export type AlertProps = {
    title?: string
    description?: string
    variant?: AlertVariant
    className?: string
    onClose?: () => void
    icon?: React.ReactNode
    classTitle?: string
    classDescription?: string
}

const Alert: React.FC<AlertProps> = ({
    title,
    description,
    variant = 'default',
    className,
    onClose = null,
    icon = null,
    classTitle = '',
    classDescription = '',
}) => (
    <AlertWrapper variant={variant} className={className}>
        {icon && icon}
        {title && (
            <AlertTitle className={classTitle}>{title}</AlertTitle>
        )}
        <AlertDescription className={classDescription}>
            {description}
        </AlertDescription>
        {onClose && (
            <X
                className="!left-auto right-[1rem] !pl-0 cursor-pointer !text-secondary-5"
                width="16"
                height="16"
                role="close-x"
                onClick={onClose}
            />
        )}
    </AlertWrapper>
)

export { Alert }
