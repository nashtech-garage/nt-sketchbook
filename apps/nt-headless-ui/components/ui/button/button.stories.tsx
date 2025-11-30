import type { Meta, StoryFn } from '@storybook/nextjs-vite'
import { User } from 'lucide-react'

import type { ButtonProps } from './button'
import { Button } from './button'

const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'success', 'gradient'],
            control: { type: 'select' }
        },
        size: {
            options: ['sm', 'md', 'lg'],
            control: { type: 'select' }
        },
        outline: {
            control: { type: 'boolean' }
        }
    }
}

export default meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />

export const Primary: StoryFn<ButtonProps> = Template.bind({})
Primary.args = {
    variant: 'primary',
    children: 'Primary'
}

export const Secondary: StoryFn<ButtonProps> = Template.bind({})
Secondary.args = {
    variant: 'secondary',
    children: 'Secondary'
}

export const Outline: StoryFn<ButtonProps> = Template.bind({})
Outline.args = {
    variant: 'primary',
    outline: true,
    children: 'Outline'
}

export const OutlineSecondary: StoryFn<ButtonProps> = Template.bind(
    {}
)
OutlineSecondary.args = {
    variant: 'secondary',
    outline: true,
    children: 'Outline Secondary'
}

export const Success: StoryFn<ButtonProps> = Template.bind({})
Success.args = {
    variant: 'success',
    children: 'Success'
}

export const Gradient: StoryFn<ButtonProps> = Template.bind({})
Gradient.args = {
    variant: 'gradient',
    children: 'Gradient'
}

export const WithIcon: StoryFn<ButtonProps> = Template.bind({})
WithIcon.args = {
    variant: 'primary',
    children: (
        <>
            🚀 <span className="ml-1">With Icon</span>
        </>
    )
}

export const IconOnly: StoryFn<ButtonProps> = Template.bind({})
IconOnly.args = {
    variant: 'primary',
    size: 'sm',
    children: <User size={15} />,
    'aria-label': 'User Icon'
}
