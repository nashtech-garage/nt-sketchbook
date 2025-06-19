import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { InputProps } from './input'
import { Input } from './input'

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['text', 'password', 'email', 'number']
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['default', 'danger', 'warning', 'success']
            }
        },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        className: { control: 'text' }
    }
} as Meta

const Template: StoryFn = (args: InputProps) => <Input {...args} />

export const Text = Template.bind({})
Text.args = {
    type: 'text',
    placeholder: 'Enter text...'
}

export const Disabled = Template.bind({})
Disabled.args = {
    type: 'text',
    placeholder: 'Disabled input...',
    disabled: true
}

export const IconCustomLeft = Template.bind({})
IconCustomLeft.args = {
    type: 'text',
    placeholder: 'Input with icon left...',
    className: 'icon-left',
    leftIcon: <span className="icon-left">🔍</span>
}

export const IconCustomRight = Template.bind({})
IconCustomRight.args = {
    type: 'text',
    placeholder: 'Input with icon right...',
    className: 'icon-right',
    rightIcon: <span className="icon-right">🔍</span>
}

export const IconRightAndLeft = Template.bind({})
IconRightAndLeft.args = {
    type: 'text',
    placeholder: 'Input with icon right...',
    className: 'icon-right',
    rightIcon: <span className="icon-right">🔍</span>,
    leftIcon: <span className="icon-left">🔍</span>
}

export const SuccessWithDefaultIcon = Template.bind({})
SuccessWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Success input with icon default',
    variant: 'success',
    hasIcon: true
}

export const DangerWithDefaultIcon = Template.bind({})
DangerWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Danger input with icon default',
    variant: 'danger',
    hasIcon: true
}

export const WarningWithDefaultIcon = Template.bind({})
WarningWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Warning input with icon default',
    variant: 'warning',
    hasIcon: true
}

export const SuccessWithCustomIcon = Template.bind({})
SuccessWithCustomIcon.args = {
    type: 'text',
    placeholder: 'Success input with icon custom',
    variant: 'success',
    leftIcon: <span className="icon-left">🔍</span>,
    rightIcon: <span className="icon-right">🔍</span>
}
