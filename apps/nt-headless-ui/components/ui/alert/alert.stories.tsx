import type { Meta, StoryFn } from '@storybook/react'
import { CircleCheck } from 'lucide-react'
import React from 'react'

import { Alert, type AlertProps } from './alert'

export default {
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
} as Meta

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />

export const Info = Template.bind({})
Info.args = {
    type: 'info',
    message: 'This is an info alert',
    showIcon: true,
    onClose: () => console.log('info closed')
}

export const Danger = Template.bind({})
Danger.args = {
    type: 'danger',
    message: 'This is a danger alert',
    showIcon: true,
    onClose: () => console.log('danger closed')
}

export const Warning = Template.bind({})
Warning.args = {
    type: 'warning',
    message: 'This is a warning alert',
    showIcon: true,
    onClose: () => console.log('warning closed')
}

export const Success = Template.bind({})
Success.args = {
    type: 'success',
    message: 'This is a success alert',
    showIcon: true,
    onClose: () => console.log('success closed')
}

export const NoIcon = Template.bind({})
NoIcon.args = {
    type: 'info',
    message: 'This is an info alert without icon',
    showIcon: false,
    onClose: () => console.log('no icon alert closed')
}

export const CustomIcon = Template.bind({})
CustomIcon.args = {
    type: 'info',
    message: 'This is an info alert with a custom icon',
    showIcon: false,
    icon: <CircleCheck className="w-5 h-5 text-blue-600" />,
    onClose: () => console.log('custom icon alert closed')
}
