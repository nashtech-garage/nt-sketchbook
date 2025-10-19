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
        className: { control: 'text' },
        layout: {
            control: { type: 'select', options: ['static', 'float'] }
        }
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
    leftIcon: <span className="icon-left">🔍</span>
}

export const IconCustomRight = Template.bind({})
IconCustomRight.args = {
    type: 'text',
    placeholder: 'Input with icon right...',
    rightIcon: <span className="icon-right">🔍</span>
}

export const IconRightAndLeft = Template.bind({})
IconRightAndLeft.args = {
    type: 'text',
    placeholder: 'Input with both icons...',
    rightIcon: <span className="icon-right">🔍</span>,
    leftIcon: <span className="icon-left">🔍</span>
}

export const SuccessWithDefaultIcon = Template.bind({})
SuccessWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Success input with default icon',
    variant: 'success',
    hasIcon: true
}

export const DangerWithDefaultIcon = Template.bind({})
DangerWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Danger input with default icon',
    variant: 'danger',
    hasIcon: true
}

export const WarningWithDefaultIcon = Template.bind({})
WarningWithDefaultIcon.args = {
    type: 'text',
    placeholder: 'Warning input with default icon',
    variant: 'warning',
    hasIcon: true
}

export const SuccessWithCustomIcon = Template.bind({})
SuccessWithCustomIcon.args = {
    type: 'text',
    placeholder: 'Success input with custom icons',
    variant: 'success',
    leftIcon: <span className="icon-left">✅</span>,
    rightIcon: <span className="icon-right">🔍</span>
}

export const LabeledStatic = Template.bind({})
LabeledStatic.args = {
    type: 'text',
    label: 'Fruit',
    placeholder: 'Apple',
    layout: 'static',
    message: ''
}

export const LabeledFloat = Template.bind({})
LabeledFloat.args = {
    type: 'email',
    label: 'Email',
    layout: 'float',
    placeholder: 'apple@example.com',
    message: ''
}

export const ErrorWithMessage = Template.bind({})
ErrorWithMessage.args = {
    type: 'email',
    label: 'Email',
    layout: 'float',
    placeholder: 'apple@example.com',
    hasError: true,
    message: 'Invalid email address',
    variant: 'danger'
}

export const SuccessWithMessage = Template.bind({})
SuccessWithMessage.args = {
    type: 'text',
    label: 'Weapons',
    layout: 'static',
    placeholder: 'Sword',
    variant: 'success',
    message: 'Looks good!'
}

export const FloatWithIconsError = Template.bind({})
FloatWithIconsError.args = {
    type: 'text',
    label: 'Username',
    layout: 'float',
    leftIcon: <span className="icon-left">👤</span>,
    rightIcon: <span className="icon-right">❌</span>,
    hasError: true,
    message: 'Username already taken',
    variant: 'danger'
}
