import clsx from 'clsx'

import {
    RadixSelect,
    RadixSelectContent,
    RadixSelectItem,
    RadixSelectTrigger,
    RadixSelectValue,
} from './radix-select'

export type SelectProps = {
    className?: string
    variant?: 'default' | 'danger' | 'success' | 'warning'
}

const variantStyles = {
    default:
        'border-secondary-6 hover:border-shade-secondary-1-50 focus:border-shade-secondary-1 disabled:bg-light disabled:border-secondary-6',
    danger: 'border-danger hover:border-danger-bold focus:border-danger disabled:bg-light disabled:border-secondary-6',
    success:
        'border-success hover:border-success-bold focus:border-success disabled:bg-light disabled:border-secondary-6',
    warning:
        'border-warning hover:border-warning-bold focus:border-warning disabled:bg-light disabled:border-secondary-6',
}

const Select = (props: SelectProps) => {
    const { className, variant = 'default' } = props
    return (
        <RadixSelect>
            <RadixSelectTrigger
                className={clsx(variantStyles[variant], className)}
            >
                <RadixSelectValue placeholder="Theme" />
            </RadixSelectTrigger>
            <RadixSelectContent>
                <RadixSelectItem value="light">Light</RadixSelectItem>
                <RadixSelectItem value="dark">Dark</RadixSelectItem>
                <RadixSelectItem value="system">
                    System
                </RadixSelectItem>
            </RadixSelectContent>
        </RadixSelect>
    )
}

export { Select }
