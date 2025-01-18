import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Badge, BadgeProps } from './badge'

export default {
    title: 'Components/Badge',
    component: Badge,
} as Meta

const Template: StoryFn<BadgeProps> = (args: BadgeProps) => (
    <Badge {...args}>Badge text</Badge>
)

export const Primary: StoryFn<BadgeProps> = Template.bind({})
Primary.args = {
    onClick: () => alert('Button clicked!'),
}

export const Danger: StoryFn<BadgeProps> = Template.bind({})
Danger.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'danger',
}

export const Warning: StoryFn<BadgeProps> = Template.bind({})
Warning.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'warning',
}

export const Info: StoryFn<BadgeProps> = Template.bind({})
Info.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'info',
}

export const Silver: StoryFn<BadgeProps> = Template.bind({})
Silver.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'silver',
}

export const WithIconLeft: StoryFn<BadgeProps> = Template.bind({})
WithIconLeft.args = {
    onClick: () => alert('Button with icon clicked!'),
    icon: (
        <span role="img" aria-label="icon">
            🚀
        </span>
    ),
}

export const WithIconRight: StoryFn<BadgeProps> = Template.bind({})
WithIconRight.args = {
    onClick: () => alert('Button with icon clicked!'),
    iconPosition: 'right',
    icon: (
        <span role="img" aria-label="icon">
            🚀
        </span>
    ),
}
