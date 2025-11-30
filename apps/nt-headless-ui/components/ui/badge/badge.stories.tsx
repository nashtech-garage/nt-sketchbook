import type { Meta, StoryFn } from '@storybook/nextjs-vite'

import type { BadgeProps } from './badge'
import Badge from './badge'

export default {
    title: 'Components/Badge',
    component: Badge,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['success', 'danger', 'warning', 'info']
            }
        },
        iconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'large']
            }
        }
    }
} as Meta

const Template: StoryFn<BadgeProps> = (args: BadgeProps) => (
    <Badge {...args}>Badge text</Badge>
)

export const Primary: StoryFn<BadgeProps> = Template.bind({})
Primary.args = {
    onClick: () => alert('Button clicked!')
}

export const Danger: StoryFn<BadgeProps> = Template.bind({})
Danger.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'danger'
}

export const Warning: StoryFn<BadgeProps> = Template.bind({})
Warning.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'warning'
}

export const Info: StoryFn<BadgeProps> = Template.bind({})
Info.args = {
    onClick: () => alert('Button clicked!'),
    variant: 'info'
}

export const WithIconLeft: StoryFn<BadgeProps> = Template.bind({})
WithIconLeft.args = {
    onClick: () => alert('Button with icon clicked!'),
    icon: (
        <span role="img" aria-label="icon">
            🚀
        </span>
    )
}

export const WithIconRight: StoryFn<BadgeProps> = Template.bind({})
WithIconRight.args = {
    onClick: () => alert('Button with icon clicked!'),
    iconPosition: 'right',
    icon: (
        <span role="img" aria-label="icon">
            🚀
        </span>
    )
}
