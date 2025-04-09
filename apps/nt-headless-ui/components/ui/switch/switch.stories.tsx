import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { SwitchProps } from './switch'
import { Switch } from './switch'

export default {
    title: 'Components/Switch',
    component: Switch,
    argTypes: {
        variant: {
            options: ['default', 'primary', 'black', 'danger'],
            control: { type: 'select' },
        },
        size: {
            options: ['small', 'medium'],
            control: { type: 'select' },
        },
    },
} as Meta

const Template: StoryFn<SwitchProps> = (args: SwitchProps) => (
    <Switch {...args} />
)

export const Default: StoryFn<SwitchProps> = Template.bind({})
Default.args = {
    onClick: () => console.log('ok'),
    variant: 'default',
}

export const Primary: StoryFn<SwitchProps> = Template.bind({})
Primary.args = {
    onClick: () => console.log('ok'),
    variant: 'primary',
}

export const Silver: StoryFn<SwitchProps> = Template.bind({})
Silver.args = {
    onClick: () => console.log('ok'),
    variant: 'silver',
}
export const Danger: StoryFn<SwitchProps> = Template.bind({})
Danger.args = {
    onClick: () => console.log('ok'),
    variant: 'danger',
}
