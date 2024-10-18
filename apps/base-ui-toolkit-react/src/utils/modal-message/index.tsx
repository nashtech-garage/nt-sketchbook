import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import {
  ModalMessage,
  ModalMessageProps,
} from '@/components/molecules/modal-message'

const modalRoot = document.body

const createModalContainer = () => {
  const container = document.createElement('div')
  modalRoot?.appendChild(container)
  return container
}

const removeModalContainer = (container: HTMLElement) => {
  modalRoot?.removeChild(container)
}

export const showMessage = (
  props: Omit<ModalMessageProps, 'isOpen' | 'closeModal'>,
) => {
  const container = createModalContainer()
  const root = createRoot(container)

  const Modal = () => {
    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
      setIsOpen(false)
    }

    useEffect(() => {
      if (!isOpen) {
        root.unmount()
        removeModalContainer(container)
      }
    }, [isOpen])

    return (
      <ModalMessage
        {...props}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    )
  }

  root.render(<Modal />)
}
