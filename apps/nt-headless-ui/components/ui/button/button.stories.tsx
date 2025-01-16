import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Button, ButtonProps } from './button'

export default {
    title: 'Components/Button',
    component: Button,
} as Meta

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
    <Button {...args}>Button</Button>
)

export const Default: StoryFn<ButtonProps> = Template.bind({})
Default.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'default',
}

export const Destructive: StoryFn<ButtonProps> = Template.bind({})
Destructive.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'destructive',
}

export const Outline: StoryFn<ButtonProps> = Template.bind({})
Outline.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'outline',
}

export const Secondary: StoryFn<ButtonProps> = Template.bind({})
Secondary.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'secondary',
}

export const Ghost: StoryFn<ButtonProps> = Template.bind({})
Ghost.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'ghost',
}

export const Link: StoryFn<ButtonProps> = Template.bind({})
Link.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'link',
}
