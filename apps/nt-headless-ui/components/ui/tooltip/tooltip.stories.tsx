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
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'danger',
                    'warning',
                    'success',
                    'info'
                ]
            }
        }
    }
} as Meta

const Template: StoryFn<TooltipProps> = (args: TooltipProps) => (
    <Tooltip {...args} trigger={<Button>Hover me</Button>}>
        Hover me
    </Tooltip>
)

export const Default = Template.bind({})
