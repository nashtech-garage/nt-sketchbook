import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CircleCheck } from 'lucide-react'

import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['info', 'danger', 'warning', 'success']
            }
        }
    }
}
export default meta

type Story = StoryObj<typeof Alert>

export const Info: Story = {
    args: {
        type: 'info',
        message: 'This is an info alert',
        showIcon: true,
        onClose: () => console.log('info closed')
    }
}

export const Danger: Story = {
    args: {
        type: 'danger',
        message: 'This is a danger alert',
        showIcon: true,
        onClose: () => console.log('danger closed')
    }
}

export const Warning: Story = {
    args: {
        type: 'warning',
        message: 'This is a warning alert',
        showIcon: true,
        onClose: () => console.log('warning closed')
    }
}

export const Success: Story = {
    args: {
        type: 'success',
        message: 'This is a success alert',
        showIcon: true,
        onClose: () => console.log('success closed')
    }
}

export const NoIcon: Story = {
    args: {
        type: 'info',
        message: 'This is an info alert without icon',
        showIcon: false,
        onClose: () => console.log('no icon alert closed')
    }
}

export const CustomIcon: Story = {
    args: {
        type: 'info',
        message: 'This is an info alert with a custom icon',
        showIcon: false,
        icon: <CircleCheck className="w-5 h-5 text-blue-600" />,
        onClose: () => console.log('custom icon alert closed')
    }
}
