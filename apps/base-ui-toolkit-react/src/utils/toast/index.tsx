import ReactDOM from 'react-dom/client'

import { Toast, ToastType } from '@/components/molecules/toast'

let numToasts = 0
export type ToastPosition = 'top' | 'bottom'
export const addToast = (data: {
  type?: ToastType
  title: string
  content: string
  duration?: number
  position?: ToastPosition
}) => {
  const {
    content,
    title = '',
    type = 'warning',
    duration = 3000,
    position = 'top',
  } = data
  const toastContainer = document.createElement('div')
  document.body.appendChild(toastContainer)
  const toastPosition = 100 + numToasts * 90
  toastContainer.style.position = 'fixed'
  toastContainer.style.right = '10px'
  if (position === 'top') {
    toastContainer.style.top = `${toastPosition}px`
  }
  if (position === 'bottom') {
    toastContainer.style.bottom = `${toastPosition}px`
  }
  const removeToast = () => {
    toastContainer.remove()
    numToasts -= 1
  }

  const root = ReactDOM.createRoot(toastContainer)
  root.render(
    <Toast
      type={type}
      title={title}
      content={content}
      onClose={removeToast}
      isOpen
    />,
  )
  numToasts += 1
  setTimeout(() => {
    removeToast()
  }, duration)
}
