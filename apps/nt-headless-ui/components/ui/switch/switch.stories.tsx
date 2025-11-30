import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs-vite'

import { Switch, type SwitchProps } from './switch'

export default {
    title: 'Components/Switch',
    component: Switch,
    argTypes: {
        variant: {
            options: ['default', 'danger', 'warning'],
            control: { type: 'select' }
        }
    }
} as Meta

const Template: StoryFn<SwitchProps> = (args: SwitchProps) => (
    <Switch {...args} />
)

export const Default: StoryFn<SwitchProps> = Template.bind({})

export const Danger: StoryObj<SwitchProps> = {
    args: {
        variant: 'danger'
    }
}

export const Warning: StoryObj<SwitchProps> = {
    args: {
        variant: 'warning'
    }
}

export const Disabled: StoryObj<SwitchProps> = {
    args: {
        disabled: true
    }
}
