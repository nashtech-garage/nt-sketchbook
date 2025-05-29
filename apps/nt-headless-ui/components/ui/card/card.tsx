import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardWrapper,
} from '@/components/radix/card'
import { cn } from '@/lib/utils'

export type CardProps = {
    children: React.ReactNode
    footer?: React.ReactNode
    header?: React.ReactNode
    className?: string
    classNameHeader?: string
    classNameFooter?: string
    classNameContent?: string
    description?: string
} & React.HTMLAttributes<HTMLDivElement>
const Card: React.FC<CardProps> = ({
    footer,
    header,
    children,
    className,
    classNameHeader,
    classNameFooter,
    classNameContent,
    description,
    ...props
}) => (
    <CardWrapper className={cn('nt-card', className)} {...props}>
        <CardContent className={cn(classNameContent)}>
            <CardHeader className={cn(classNameHeader)}>
                {header}
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {children}
            <CardFooter className={cn(classNameFooter)}>
                {footer}
            </CardFooter>
        </CardContent>
    </CardWrapper>
)
Card.displayName = 'Card'
export { Card }
