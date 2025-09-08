import type { Meta, StoryObj } from '@storybook/react'
import { User } from 'lucide-react'

import { Collapsible } from './collapsible'

const meta: Meta<typeof Collapsible> = {
    title: 'Components/Collapsible',
    component: Collapsible,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
    render: () => (
        <Collapsible
            classNameTriggerWrapper="border-b pb-5"
            trigger={
                <div className="flex items-center justify-between w-full px-4 py-2">
                    <div className="flex items-center gap-4">
                        <User
                            size={40}
                            className="text-shade-neutral-60"
                        />
                        <div className="flex flex-col items-start text-sm gap-2">
                            <strong>Account settings</strong>
                            <span>
                                General copilot for most of employees
                                that helps to answer questions related
                                to NT policy.
                            </span>
                        </div>
                    </div>
                </div>
            }
        >
            <p>This is the collapsible content.</p>
        </Collapsible>
    )
}
