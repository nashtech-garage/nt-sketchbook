import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useMemo } from 'react'
import {
  IoIosCheckmark,
  IoIosClose,
  IoIosWarning,
} from 'react-icons/io'

import { Button } from '@/components/atoms'
import { combineClasses } from '@/utils/tailwind'

import { useAutoClose } from './use-auto-close'

export type IconType = 'warning' | 'error' | 'success' | ''

export type ModalMessageProps = {
  isOpen: boolean
  title: string
  text?: string
  closeModal: () => void
  confirmButtonClass?: string
  cancelButtonClass?: string
  className?: string
  confirmButtonText?: string
  cancelButtonText?: string
  type?: IconType
  onConfirm?: () => void
  onCancel?: () => void
  autoCloseDuration?: boolean
  duration?: number
  showConfirm?: boolean
  showCancel?: boolean
  html?: ReactNode
}

export const ModalMessage = (props: ModalMessageProps) => {
  const {
    isOpen = false,
    className = '',
    text,
    title,
    confirmButtonText = 'OK',
    cancelButtonText = 'Cancel',
    type = 'warning',
    confirmButtonClass = '',
    cancelButtonClass = '',
    onConfirm = () => null,
    onCancel = () => null,
    closeModal = () => null,
    autoCloseDuration = false,
    duration = 5000,
    showConfirm = true,
    showCancel = true,
    html = null,
  } = props

  const progress = useAutoClose({
    isOpen,
    autoCloseDuration,
    duration,
    onClose: closeModal,
  })

  const typeIcon = useMemo(() => {
    if (type === 'error') {
      return (
        <div className="mx-auto align-middle flex items-center justify-center h-12 w-12 rounded-full border-2 border-red-500">
          <IoIosClose size={40} className="text-red-500" />
        </div>
      )
    }

    if (type === 'success') {
      return (
        <div className="mx-auto align-middle flex items-center justify-center h-12 w-12 rounded-full border-2 border-green-500">
          <IoIosCheckmark size={40} className="text-green-500" />
        </div>
      )
    }
    if (type === 'warning') {
      return (
        <div className="mx-auto align-middle flex items-center justify-center h-12 w-12 rounded-full border-2 border-yellow-500">
          <IoIosWarning size={35} className="text-yellow-500" />
        </div>
      )
    }

    return ''
  }, [type])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={combineClasses(
                'relative inline-block w-full max-w-md p-7 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl',
                className,
              )}
            >
              <IoIosClose
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
                size={35}
              />
              {typeIcon}
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  {html || (
                    <p className="text-sm text-gray-500">{text}</p>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center gap-5">
                {showCancel && (
                  <Button
                    className={combineClasses(
                      'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                      cancelButtonClass,
                    )}
                    onClick={() => {
                      onCancel()
                      closeModal()
                    }}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                {showConfirm && (
                  <Button
                    className={confirmButtonClass}
                    onClick={() => {
                      onConfirm()
                      closeModal()
                    }}
                  >
                    {confirmButtonText}
                  </Button>
                )}
              </div>
              {autoCloseDuration && (
                <div className="mt-4 w-full bg-gray-200 rounded-full h-1 absolute bottom-0 left-0">
                  <div
                    data-testid="progressbar"
                    className="bg-blue-500 h-1 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
