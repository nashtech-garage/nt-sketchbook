import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

export type PositionType = 'right' | 'left'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title: string
  position?: PositionType
}

export const Drawer = (props: DrawerProps) => {
  const {
    isOpen,
    onClose,
    children,
    title,
    position = 'right',
  } = props

  const isRightPosition = position === 'right'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-layer-1/60 transition-opacity bg-black/20" />
        </Transition.Child>

        <div
          data-testid="drawer-panel"
          className={`fixed inset-0 flex  ${
            isRightPosition ? 'justify-end' : 'justify-start'
          }`}
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom={
              isRightPosition
                ? 'translate-x-full'
                : '-translate-x-full'
            }
            enterTo={
              isRightPosition ? 'translate-x-0' : '-translate-x-0'
            }
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom={
              isRightPosition ? 'translate-x-0' : '-translate-x-0'
            }
            leaveTo={
              isRightPosition
                ? 'translate-x-full'
                : '-translate-x-full'
            }
          >
            <Dialog.Panel className="bg-white relative flex h-full w-screen max-w-md flex-col bg-layer-2 shadow-2xl">
              <div className="absolute top-4 right-5">
                <button
                  data-testid="close"
                  type="button"
                  onClick={onClose}
                  className="aspect-square border-none p-2 child-svg:h-5 child-svg:w-5"
                >
                  <span className="sr-only">Close</span>
                  <MdClose className="h-5 w-5" />
                </button>
              </div>

              <div className="flex h-16 flex-shrink-0 items-center justify-between px-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-heading"
                >
                  {title}
                </Dialog.Title>
              </div>
              <hr className="border-hr" />
              <div className="flex-1 px-6 py-5 sm:py-6 overflow-auto">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Drawer
