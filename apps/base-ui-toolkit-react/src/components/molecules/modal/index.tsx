import { ReactNode, useMemo } from 'react'

import { Button } from '@/components/atoms/button'
import { Portal } from '@/components/templates/portal'
import { combineClasses } from '@/utils/tailwind'

export type ModalProps = {
    width?: number
    className?: string
    isOpen?: boolean
    title?: string
    onSubmit?: () => void
    onCancel?: () => void
    children?: React.ReactNode
    cancelText?: string
    submitText?: string
    footer?: ReactNode
    cancelWithOverlayClick?: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        title,
        onSubmit,
        onCancel,
        isOpen = true,
        children,
        className,
        width,
        cancelText = '',
        submitText = '',
        footer,
        cancelWithOverlayClick = true,
    } = props

    if (!isOpen) {
        return null
    }

    const style = useMemo(() => {
        if (width) {
            return {
                width: `${width}px`,
            }
        }
        return undefined
    }, [width])

    const handleOverlayClick = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        if (
            cancelWithOverlayClick &&
            event.target === event.currentTarget &&
            onCancel
        ) {
            onCancel()
        }
    }

    return (
        <Portal>
            <div
                data-testid="modal-container"
                onMouseDown={handleOverlayClick}
                className="fixed inset-0 flex justify-center items-center visible bg-black/20 "
            >
                <div
                    className={combineClasses(
                        'animate-fade-in relative w-full max-w-2xl px-4 h-full md:h-auto',
                        className,
                    )}
                    style={style}
                >
                    <div className="container bg-white rounded-lg shadow relative dark:bg-gray-700">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="title text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                                {title}
                            </h3>
                            <button
                                onClick={onCancel}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 body">
                            {children}
                        </div>
                        <div className="footer flex justify-end space-x-7 p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {footer || (
                                <>
                                    {onCancel && (
                                        <Button
                                            label={
                                                cancelText || 'Cancel'
                                            }
                                            onClick={onCancel}
                                            className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                        />
                                    )}
                                    {onSubmit && (
                                        <Button
                                            label={
                                                submitText || 'Submit'
                                            }
                                            onClick={onSubmit}
                                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
