import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'
import ReactDOM from 'react-dom'

export type ModalSize = 'sm' | 'md' | 'lg'

export type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    children?: ReactNode
    className?: string
    classNameHeader?: string
    description?: string
    footer?: ReactNode
    size?: ModalSize
}

export const Modal = (props: ModalProps) => {
    const {
        isOpen,
        title,
        description,
        children,
        footer,
        onClose,
        size = 'sm',
        className = '',
        classNameHeader = ''
    } = props

    if (!isOpen) {
        return null
    }

    return ReactDOM.createPortal(
        <div className="nt-modal show" style={{ display: 'block' }}>
            <div
                className={cn(
                    'nt-modal-box',
                    'nt-modal-box-' + size,
                    className
                )}>
                <div
                    className={cn(
                        'nt-modal-header',
                        classNameHeader
                    )}>
                    <div>
                        <h2 className="nt-modal-title">{title}</h2>
                        {description && (
                            <p className="nt-modal-description">
                                {description}
                            </p>
                        )}
                    </div>
                    <button
                        className="nt-modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                        type="button">
                        &times;
                    </button>
                </div>

                <div className="nt-modal-content">{children}</div>

                {footer && (
                    <div className="nt-modal-footer">{footer}</div>
                )}
            </div>
        </div>,
        document.body
    )
}

export default Modal
