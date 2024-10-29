import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

import { Loading } from '@/components/atoms'
import { combineClasses } from '@/utils/tailwind'

type LoadingDialogProps = {
    isOpen?: boolean
    loadingClassName?: string
    onClose?: () => void
}

export const LoadingDialog = (props: LoadingDialogProps) => {
    const {
        isOpen = true,
        loadingClassName,
        onClose = () => null,
    } = props
    const dialogRef = useRef(null)
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                data-testid="loading-dialog"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        ref={dialogRef}
                        className="text-center flex justify-center items-center h-full"
                    >
                        <Loading
                            className={combineClasses(
                                loadingClassName,
                                'm-auto',
                            )}
                        />
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
