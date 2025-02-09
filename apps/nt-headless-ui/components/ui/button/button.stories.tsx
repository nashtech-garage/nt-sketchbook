import { Meta, StoryFn } from '@storybook/react'
import { User } from 'lucide-react'
import React from 'react'

import { Button, ButtonProps } from './button'

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            options: [
                'primary',
                'secondary',
                'outline',
                'outline-secondary',
            ],
            control: { type: 'select' },
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
        },
    },
} as Meta

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
    <Button {...args} />
)

export const Primary: StoryFn<ButtonProps> = Template.bind({})
Primary.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'primary',
    children: 'Primary',
}

export const Secondary: StoryFn<ButtonProps> = Template.bind({})
Secondary.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'secondary',
    children: 'Secondary',
}

export const Outline: StoryFn<ButtonProps> = Template.bind({})
Outline.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'outline',
    children: 'Outline',
}

export const OutlineSecondary: StoryFn<ButtonProps> = Template.bind(
    {},
)
OutlineSecondary.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'outline-secondary',
    children: 'Outline Secondary',
}
export const WithIcon: StoryFn<ButtonProps> = Template.bind({})
WithIcon.args = {
    onClick: () => alert('Button with icon clicked!'),
    variant: 'primary',
    children: 'With Icon',
    icon: (
        <span role="img" aria-label="icon">
            🚀
        </span>
    ),
}

export const Icon: StoryFn<ButtonProps> = Template.bind({})
Icon.args = {
    onClick: () => alert('Icon clicked!'),
    variant: 'primary',
    children: <User />,
    size: 'icon',
}
