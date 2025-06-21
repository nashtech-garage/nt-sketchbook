import type { Meta, StoryObj } from '@storybook/react'

import { Switch, type SwitchProps } from './switch'

const meta: Meta<SwitchProps> = {
    title: 'Components/Switch',
    component: Switch,
    argTypes: {
        variant: {
            options: ['default', 'danger', 'warning'],
            control: { type: 'radio' }
        }
    },
    args: {
        variant: 'default',
        disabled: false
    }
}

export default meta

type Story = StoryObj<SwitchProps>

export const Basic: Story = {
    args: {
        name: 'basic-switch'
    }
}

export const Danger: Story = {
    args: {
        name: 'danger-switch',
        variant: 'danger'
    }
}

export const Warning: Story = {
    args: {
        name: 'warning-switch',
        variant: 'warning'
    }
}

export const Disabled: Story = {
    args: {
        name: 'disabled-switch',
        disabled: true,
        checked: true
    }
}
