import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Input, InputSize } from './input'

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['text', 'password', 'email', 'number'],
            },
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'danger',
                    'warning',
                    'violet',
                    'success',
                ],
            },
        },
        inputSize: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large'] as const,
            },
        },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        className: { control: 'text' },
    },
} as Meta

const Template: StoryFn = (args) => <Input {...args} />

export const Text = Template.bind({})
Text.args = {
    type: 'text',
    placeholder: 'Enter text...',
}

export const Password = Template.bind({})
Password.args = {
    type: 'password',
    placeholder: 'Enter password...',
}

export const Email = Template.bind({})
Email.args = {
    type: 'email',
    placeholder: 'Enter email...',
}

export const Disabled = Template.bind({})
Disabled.args = {
    type: 'text',
    placeholder: 'Disabled input...',
    disabled: true,
}

export const IconLeft = Template.bind({})
IconLeft.args = {
    type: 'text',
    placeholder: 'Input with icon left...',
    className: 'icon-left',
    leftIcon: <span className="icon-left">🔍</span>,
}

export const IconRight = Template.bind({})
IconRight.args = {
    type: 'text',
    placeholder: 'Input with icon right...',
    className: 'icon-right',
    rightIcon: <span className="icon-right">🔍</span>,
}

export const IconRightAndLeft = Template.bind({})
IconRightAndLeft.args = {
    type: 'text',
    placeholder: 'Input with icon right...',
    className: 'icon-right',
    rightIcon: <span className="icon-right">🔍</span>,
    leftIcon: <span className="icon-right">🔍</span>,
}

export const Small = Template.bind({})
Small.args = {
    type: 'text',
    placeholder: 'Small input...',
    inputSize: 'small' as InputSize,
}

export const Medium = Template.bind({})
Medium.args = {
    type: 'text',
    placeholder: 'Medium input...',
}

export const Large = Template.bind({})
Large.args = {
    type: 'text',
    placeholder: 'Large input...',
    inputSize: 'large' as InputSize,
}
