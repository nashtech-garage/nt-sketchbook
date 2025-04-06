import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Button } from '../button'
import { Tooltip, TooltipProps } from './tooltip'

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    argTypes: {
        content: { control: 'text' },
        position: {
            control: {
                type: 'select',
                options: ['top', 'right', 'bottom', 'left'],
            },
        },
    },
} as Meta

const Template: StoryFn<TooltipProps> = (args) => (
    <Tooltip {...args} trigger={<Button>Hover me</Button>}>
        Hover me
    </Tooltip>
)

export const Default = Template.bind({})
