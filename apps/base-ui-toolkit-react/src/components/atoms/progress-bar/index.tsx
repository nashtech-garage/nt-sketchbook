import { useMemo } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type ProgressBarType = {
    value?: number
    isIndeterminate?: boolean
    className?: {
        wrapper?: string
        item?: string
    }
}

export const ProgressBar = (props: ProgressBarType) => {
    const {
        value = 0,
        isIndeterminate = false,
        className = {
            wrapper: '',
            item: '',
        },
    } = props

    const clampedValue = useMemo(() => {
        if (isIndeterminate) {
            return 100
        }
        return Math.min(100, Math.max(0, value))
    }, [value])

    return (
        <div
            className={combineClasses(
                'overflow-hidden bg-blue-50 h-[10px] w-full',
                className.wrapper,
            )}
        >
            <span
                data-testid="progressBar"
                className={combineClasses(
                    'h-full bg-blue-500 w-full block rounded-full text-center',
                    {
                        'progress left-right': isIndeterminate,
                    },
                    className.item,
                )}
                style={{ width: `${clampedValue}%` }}
            />
        </div>
    )
}
