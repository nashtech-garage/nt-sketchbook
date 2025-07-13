import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Button } from '../button'
import type { TooltipProps } from './tooltip'
import { Tooltip } from './tooltip'

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    argTypes: {
        content: { control: 'text' },
        position: {
            control: {
                type: 'select',
                options: ['top', 'right', 'bottom', 'left']
            }
        }
    }
} as Meta

const Template: StoryFn<TooltipProps> = (args: TooltipProps) => (
    <div
        className="mx-36 mt-24"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <Tooltip {...args} trigger={<Button>Hover me</Button>}>
            {args.children}
        </Tooltip>
    </div>
)

export const Top = Template.bind({})
export const Right = Template.bind({})
export const Bottom = Template.bind({})
export const Left = Template.bind({})

Top.args = {
    className: '',
    children: 'Top position',
    position: 'top'
}
Right.args = {
    className: '',
    children: 'Right position',
    position: 'right'
}
Bottom.args = {
    className: '',
    children: 'Bottom position',
    position: 'bottom'
}
Left.args = {
    className: '',
    children: 'Left position',
    position: 'left'
}
