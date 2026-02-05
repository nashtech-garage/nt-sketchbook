import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as LucideIcons from 'lucide-react'
import React from 'react'

type IconCanvasProps = {
    children?: React.ReactNode
}

const IconCanvas = ({ children }: IconCanvasProps) => {
    return <>{children}</>
}

const meta: Meta<typeof IconCanvas> = {
    title: 'Foundation/Icons',
    component: IconCanvas,
    tags: ['autodocs']
}

export default meta

export const AllIcons: StoryObj<typeof IconCanvas> = {
    args: {
        children: (
            <div className="grid grid-cols-6 gap-5">
                {Object.entries(LucideIcons)
                    .slice(0, 72)
                    .map(([name, Icon]) => (
                        <div
                            key={name}
                            className="flex flex-col items-center text-xs text-gray-600">
                            {React.createElement(
                                Icon as React.ElementType,
                                { size: 24 }
                            )}
                            <span className="mt-1 break-all text-center">
                                {name}
                            </span>
                        </div>
                    ))}
            </div>
        )
    }
}
