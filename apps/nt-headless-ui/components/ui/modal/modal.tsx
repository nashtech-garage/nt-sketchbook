import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/radix/dialog'
import { cn } from '@/lib/utils'
import { type DialogProps } from '@radix-ui/react-dialog'
import React from 'react'

export type ModalProps = {
    content: React.ReactNode
    isOpen: boolean
    title?: React.ReactNode
    description?: React.ReactNode
    footer?: React.ReactNode
    className?: string
    classNameFooter?: string
    classNameHeader?: string
} & DialogProps

export const Modal = (props: ModalProps) => {
    const {
        isOpen = false,
        title,
        description,
        className = '',
        footer = null,
        classNameHeader = '',
        classNameFooter = '',
        content = '',
        ...dialogProps
    } = props

    return (
        <Dialog open={isOpen} {...dialogProps}>
            <DialogContent
                className={cn('sm:max-w-[425px]', className)}
            >
                {(title || description) && (
                    <DialogHeader className={classNameHeader}>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && (
                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}
                {content}
                {footer && (
                    <DialogFooter className={classNameFooter}>
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
