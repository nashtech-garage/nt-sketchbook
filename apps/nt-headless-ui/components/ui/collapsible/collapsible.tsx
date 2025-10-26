import { cn } from '@/lib/utils'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { type ReactNode, useState } from 'react'

export type CollapsibleProps = {
    children: ReactNode
    trigger: ReactNode
    classNameTrigger?: string
    classNameTriggerWrapper?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    shouldDisplayArrow?: boolean
}

export const Collapsible = (props: CollapsibleProps) => {
    const {
        children,
        open: controlledOpen,
        onOpenChange,
        trigger,
        classNameTriggerWrapper = '',
        shouldDisplayArrow = true
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
                    'nt-collapse show',
                    classNameTriggerWrapper
                )}
            >
                {trigger}
                {shouldDisplayArrow && (
                    <ChevronDown
                        className={cn(
                            'nt-collapse-arrow',
                            isOpen && 'down',
                            !isOpen && 'up'
                        )}
                    />
                )}
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content>
                {children}
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    )
}

export default Collapsible
