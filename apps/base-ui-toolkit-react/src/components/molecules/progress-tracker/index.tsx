import { ReactNode } from 'react'
import { GoDotFill } from 'react-icons/go'

import { ProgressBar } from '@/components/atoms/progress-bar'
import { combineClasses } from '@/utils/tailwind'

type ProgressStatus = 'disabled' | 'unvisited' | 'visited' | 'current'

export type ProgressTrackerItem = {
  id: string
  label: ReactNode
  status: ProgressStatus
}

export type ProgressTrackerProps = {
  className?: {
    wrapper: string
    item: string
  }
  items: ProgressTrackerItem[]
  onChangeStep?: (item: ProgressTrackerItem) => void
  spacing?: 'comfortable' | 'default'
}

export const getProgressBarClassName = (
  index: number,
  items: ProgressTrackerItem[],
  spacing: 'comfortable' | 'default',
) => {
  if (spacing !== 'default') {
    return ''
  }

  if (index === 0) {
    return 'rounded-none rounded-l-full'
  }

  if (
    index ===
    items.filter((item) =>
      ['disabled', 'visited'].includes(item.status),
    ).length -
      1
  ) {
    return 'rounded-none rounded-r-full'
  }

  return 'rounded-none '
}

export const ProgressTracker = (props: ProgressTrackerProps) => {
  const {
    items,
    className = {
      wrapper: '',
      item: '',
    },
    spacing = 'default',
    onChangeStep,
  } = props

  const renderStatus = (status: ProgressStatus, index: number) => {
    if (['visited', 'disabled'].includes(status)) {
      return (
        <ProgressBar
          className={{
            wrapper: 'ml-[100%] w-full',
            item: getProgressBarClassName(index, items, spacing),
          }}
          value={100}
        />
      )
    }

    if (status === 'unvisited') {
      return <GoDotFill data-testid="dot-icon" />
    }

    return <div className="h-4" />
  }

  const handleClickStep = (item: ProgressTrackerItem) => {
    if (item.status === 'disabled' || item.status === 'unvisited') {
      return
    }

    onChangeStep!(item)
  }

  return (
    <div
      className={combineClasses(
        `justify-center flex flex-col gap-3 ${className?.wrapper} w-full`,
      )}
    >
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between">
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{ width: `${100 / items.length}%` }}
              className="text-center items-center justify-center flex-col gap-3 flex"
            >
              {renderStatus(item.status, index)}
              <span
                className={combineClasses(
                  `cursor-pointer ${className.item} text-gray-500`,
                  {
                    'opacity-50 ': item.status === 'disabled',
                    'cursor-not-allowed pointer-events-none':
                      item.status === 'unvisited' ||
                      item.status === 'disabled',
                    'text-blue-500 font-semibold':
                      item.status === 'current',
                  },
                )}
                id={item.id}
                onClick={() => handleClickStep(item)}
                aria-hidden="true"
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
