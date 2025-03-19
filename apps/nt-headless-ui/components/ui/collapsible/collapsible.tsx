import { cn } from '@headless-ui/lib/utils'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export type CollapsibleProps = {
    children: React.ReactNode
    classChildren?: string
    trigger: React.ReactNode
    classNameTrigger?: string
    classNameTriggerWrapper?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export const Collapsible = (props: CollapsibleProps) => {
    const {
        children,
        open: controlledOpen,
        onOpenChange,
        trigger,
        classNameTrigger = '',
        classNameTriggerWrapper = '',
        classChildren = '',
    } = props

    const [isOpen, setIsOpen] = useState(controlledOpen ?? false)

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        onOpenChange?.(open)
    }

    return (
        <CollapsiblePrimitive.Root
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <CollapsiblePrimitive.Trigger
                className={cn(
                    'flex items-center justify-between w-full px-4 py-2',
                    classNameTriggerWrapper,
                )}
            >
                <div className={classNameTrigger}>{trigger}</div>
                <ChevronDown
                    className={`transition-transform text-text ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className={classChildren}>
                {children}
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    )
}
