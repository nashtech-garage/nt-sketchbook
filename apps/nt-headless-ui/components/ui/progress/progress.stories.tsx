import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Progress, ProgressProps } from './progress'

export default {
    title: 'Components/Progress',
    component: Progress,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'danger',
                    'warning',
                    'success',
                    'info',
                ],
            },
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'],
            },
        },
    },
} as Meta

const Template: StoryFn<ProgressProps> = (args) => (
    <Progress {...args} />
)

export const Default: StoryFn<ProgressProps> = Template.bind({})
Default.args = {
    value: 50,
    max: 100,
}

export const Halfway: StoryFn<ProgressProps> = Template.bind({})
Halfway.args = {
    value: 50,
    max: 100,
}

export const Complete: StoryFn<ProgressProps> = Template.bind({})
Complete.args = {
    value: 100,
    max: 100,
}
export const WithVariant: StoryFn<ProgressProps> = Template.bind({})
WithVariant.args = {
    value: 75,
    max: 100,
    variant: 'success',
}

export const WithSize: StoryFn<ProgressProps> = Template.bind({})
WithSize.args = {
    value: 25,
    max: 100,
    size: 'large',
}
