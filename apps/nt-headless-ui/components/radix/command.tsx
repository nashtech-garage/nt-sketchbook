import { cn } from '@/lib/utils'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import type {
    ComponentPropsWithoutRef,
    ElementRef,
    HTMLAttributes
} from 'react'
import { forwardRef } from 'react'

import { Dialog, DialogContent } from './dialog'

const Command = forwardRef<
    ElementRef<typeof CommandPrimitive>,
    ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            'flex h-full w-full flex-col overflow-hidden rounded-md',
            'bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50',
            className
        )}
        {...props}
    />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => (
    <Dialog {...props}>
        <DialogContent className="overflow-hidden p-0">
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 dark:[&_[cmdk-group-heading]]:text-neutral-400">
                {children}
            </Command>
        </DialogContent>
    </Dialog>
)

const CommandInput = forwardRef<
    ElementRef<typeof CommandPrimitive.Input>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div
        className="flex items-center border px-3 mx-3 mt-3 mb-5 rounded"
        cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-400',
                className
            )}
            {...props}
        />
    </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = forwardRef<
    ElementRef<typeof CommandPrimitive.List>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn(
            'max-h-[300px] mt-0 overflow-y-auto overflow-x-hidden mb-3',
            className
        )}
        {...props}
    />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = forwardRef<
    ElementRef<typeof CommandPrimitive.Empty>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = forwardRef<
    ElementRef<typeof CommandPrimitive.Group>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            'overflow-hidden px-3 text-neutral-950 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-neutral-500 dark:text-neutral-50 dark:[&_[cmdk-group-heading]]:text-neutral-400',
            className
        )}
        {...props}
    />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = forwardRef<
    ElementRef<typeof CommandPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn(
            '-mx-1 h-px bg-neutral-200 dark:bg-neutral-800',
            className
        )}
        {...props}
    />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = forwardRef<
    ElementRef<typeof CommandPrimitive.Item>,
    ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        role="option"
        className={cn(
            'relative flex cursor-pointer gap-3 select-none items-center rounded px-2 py-3',
            'text-sm outline-none data-[disabled=true]:pointer-events-none',
            '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
            className
        )}
        {...props}
    />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn(
            'ml-auto text-xs tracking-widest text-neutral-500 dark:text-neutral-400',
            className
        )}
        {...props}
    />
)
CommandShortcut.displayName = 'CommandShortcut'

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
}
