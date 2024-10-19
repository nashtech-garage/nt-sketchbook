import { useMemo } from 'react'
import {
  HiCheck,
  HiExclamation,
  HiX,
  HiXCircle,
} from 'react-icons/hi'

import { combineClasses } from '@/utils/tailwind'

export type ToastType = 'success' | 'fail' | 'warning'
type ToastProps = {
  title: string
  content: string
  type?: ToastType
  className?: string
  isOpen?: boolean
  onClose: () => void
}

export const Toast = (props: ToastProps) => {
  const {
    title,
    content,
    type,
    className,
    isOpen = false,
    onClose,
  } = props
  const typeValues = useMemo(() => {
    if (type === 'success') {
      return {
        classResult: 'text-green-default',
        icon: <HiCheck data-testid="success-icon" />,
      }
    }
    if (type === 'warning') {
      return {
        classResult: 'text-gold-default',
        icon: <HiExclamation data-testid="warning-icon" />,
      }
    }
    if (type === 'fail') {
      return {
        classResult: 'text-orangeRed-default',
        icon: <HiXCircle data-testid="fail-icon" />,
      }
    }
    return null
  }, [type])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={combineClasses(
        'animate-fade-in flex justify-between right-5 mb-5',
        isOpen && 'transform translate-y-0 opacity-100',
      )}
    >
      <div className="toast w-72 bg-gray-50 rounded-md pt-3 pb-3 pl-2 pr-2 shadow-lg shadow-gray-500/50 ">
        <div className="flex justify-between mb-2">
          <div className="flex justify-center items-center">
            {type && (
              <div
                data-testid="toast-type"
                className={typeValues?.classResult}
              >
                {typeValues?.icon}
              </div>
            )}
            <p
              className={combineClasses(
                'text-sm ml-2 font-semibold',
                className,
                typeValues?.classResult,
              )}
            >
              {title}
            </p>
          </div>
          <button>
            <HiX onClick={onClose} />
          </button>
        </div>
        <p
          className={combineClasses(
            'text-xs text-slate-500 ml-3',
            type && 'ml-6',
          )}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
