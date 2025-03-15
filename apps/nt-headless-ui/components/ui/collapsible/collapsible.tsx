import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type CollapsibleProps = {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger: React.ReactNode
}

export const Collapsible = ({
    children,
    open: controlledOpen,
    onOpenChange,
    trigger,
}: CollapsibleProps) => {
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
            <CollapsiblePrimitive.Trigger className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md">
                {trigger}
                <ChevronDown
                    className={`transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="p-4 border rounded-md bg-white">
                    {children}
                </div>
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    )
}
