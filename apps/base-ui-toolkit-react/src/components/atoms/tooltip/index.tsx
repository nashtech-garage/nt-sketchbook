import { useMemo } from 'react'
import { BiSolidLeftArrow } from 'react-icons/bi'

import { combineClasses } from '@/utils/tailwind'

type Position = 'top' | 'right' | 'left' | 'bottom'

type TooltipProps = {
    children: React.ReactNode
    message: string
    position?: Position
}

export const Tooltip = (props: TooltipProps) => {
    const { children, message, position = 'bottom' } = props

    const tooltipPosition = useMemo(() => {
        switch (position) {
            case 'top':
                return 'absolute bottom-[125%]'
            case 'bottom':
                return 'absolute top-[125%]'
            case 'right':
                return 'absolute left-[115%]'
            case 'left':
                return 'absolute right-[115%]'
            default:
                return 'absolute bottom-[125%]'
        }
    }, [position])

    return (
        <div className="group relative inline-flex justify-center items-center">
            {children}
            <div
                data-testid="tooltip"
                className={combineClasses(
                    'justify-center flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 w-max',
                    tooltipPosition,
                )}
            >
                <BiSolidLeftArrow
                    size={15}
                    className={combineClasses(
                        'text-gray-800 absolute',
                        {
                            '-left-2.5 top-2.5': position === 'right',
                            '-right-2.5 top-2.5 rotate-180':
                                position === 'left',
                            '-bottom-2.5 -rotate-90':
                                position === 'top',
                            '-top-2.5 rotate-90':
                                position === 'bottom',
                        },
                    )}
                />
                {message}
            </div>
        </div>
    )
}
