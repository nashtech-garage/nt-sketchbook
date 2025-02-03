import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Input } from './input'

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
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        className: { control: 'text' },
    },
} as Meta

const Template: StoryFn<React.ComponentProps<'input'>> = (args) => (
    <Input {...args} />
)

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
