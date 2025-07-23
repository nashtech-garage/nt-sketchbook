import type { Meta, StoryObj } from '@storybook/react'
import { User } from 'lucide-react'

import { Button } from './button'

const meta: Meta<typeof Button> = {
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
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary'
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary'
    }
}

export const Outline: Story = {
    args: {
        variant: 'primary',
        outline: true,
        children: 'Outline'
    }
}

export const OutlineSecondary: Story = {
    args: {
        variant: 'secondary',
        outline: true,
        children: 'Outline Secondary'
    }
}

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success'
    }
}

export const Gradient: Story = {
    args: {
        variant: 'gradient',
        children: 'Gradient'
    }
}

export const WithIcon: Story = {
    args: {
        variant: 'primary',
        children: (
            <>
                🚀 <span className="ml-1">With Icon</span>
            </>
        )
    }
}

export const IconOnly: Story = {
    args: {
        variant: 'primary',
        size: 'sm',
        children: <User size={15} />,
        'aria-label': 'User Icon'
    }
}
