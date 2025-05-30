import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardWrapper,
} from '@/components/radix/card'
import { cn } from '@/lib/utils'

export type CardVariant =
    | 'small'
    | 'default'
    | 'success'
    | 'danger'
    | 'primary'
export type CardProps = {
    children: React.ReactNode
    footer?: React.ReactNode
    header?: React.ReactNode
    className?: string
    classNameHeader?: string
    classNameFooter?: string
    classNameContent?: string
    description?: string
    variant?: CardVariant
    icon?: string
} & React.HTMLAttributes<HTMLDivElement>
const Card: React.FC<CardProps> = ({
    footer,
    header,
    children,
    className,
    classNameHeader,
    classNameFooter,
    classNameContent,
    variant = 'default',
    description,
    icon,
    ...props
}) => (
    <CardWrapper
        className={cn('nt-card', `nt-card-${variant}`, className)}
        {...props}
    >
        <CardContent
            className={cn('nt-card-content', classNameContent)}
        >
            <CardHeader
                className={cn('nt-card-header', classNameHeader)}
            >
                <div className="flex flex-col">
                    <div className="flex">
                        {icon && (
                            <span className={cn('nt-card-icon mr-2')}>
                                {icon}
                            </span>
                        )}
                        <CardTitle
                            className={cn(
                                'nt-card-title',
                                classNameHeader,
                            )}
                        >
                            {header}
                        </CardTitle>
                    </div>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {children}
            <CardFooter
                className={cn('nt-card-footer', classNameFooter)}
            >
                {footer}
            </CardFooter>
        </CardContent>
    </CardWrapper>
)
Card.displayName = 'Card'
export { Card }
