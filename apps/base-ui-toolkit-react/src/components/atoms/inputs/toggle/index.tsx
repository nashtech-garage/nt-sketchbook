import { useState } from 'react'

import { combineClasses } from '@/utils/tailwind'

export type ToggleProps = {
    label?: string
    className?: string
    onChange?: (value: boolean) => void
}

export const Toggle = (props: ToggleProps) => {
    const {
        label = '',
        className = '',
        onChange = () => null,
    } = props
    const [checked, setChecked] = useState(false)

    const toggle = () => {
        setChecked(!checked)
        if (onChange) {
            onChange(!checked)
        }
    }

    return (
        <div
            className={combineClasses(
                'flex items-center w-full mb-12 ',
                className,
            )}
        >
            <label
                htmlFor="toggle"
                className="flex items-center cursor-pointer"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="toggle"
                        data-testid="toggle"
                        className="sr-only"
                        checked={checked}
                        onChange={toggle}
                    />
                    <div
                        className={combineClasses(
                            'block  w-14 h-8 rounded-full transition-colors duration-200 ease-in-out',
                            {
                                'bg-gray-600': !checked,
                                'bg-green-500': checked,
                            },
                        )}
                    />
                    <div
                        className={combineClasses(
                            'dot absolute top-1 bg-white w-6 h-6 rounded-full',
                            {
                                'left-1 ': !checked,
                                'right-1': checked,
                            },
                        )}
                    />
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                    {label}
                </div>
            </label>
        </div>
    )
}
