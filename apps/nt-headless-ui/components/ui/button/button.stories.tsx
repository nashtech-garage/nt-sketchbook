import type { Meta, StoryFn } from '@storybook/react'
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

export const Primary = Template.bind({})
Primary.args = {
    variant: 'primary',
    children: 'Primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
    variant: 'secondary',
    children: 'Secondary'
}

export const Outline = Template.bind({})
Outline.args = {
    variant: 'primary',
    outline: true,
    children: 'Outline'
}

export const OutlineSecondary = Template.bind({})
OutlineSecondary.args = {
    variant: 'secondary',
    outline: true,
    children: 'Outline Secondary'
}

export const Success = Template.bind({})
Success.args = {
    variant: 'success',
    children: 'Success'
}

export const Gradient = Template.bind({})
Gradient.args = {
    variant: 'gradient',
    children: 'Gradient'
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    variant: 'primary',
    children: (
        <>
            🚀 <span className="ml-1">With Icon</span>
        </>
    )
}

export const IconOnly = Template.bind({})
IconOnly.args = {
    variant: 'primary',
    size: 'sm',
    children: <User size={15} />,
    'aria-label': 'User Icon'
}
