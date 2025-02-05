import { Meta, StoryFn } from '@storybook/react'
import { InfoIcon } from 'lucide-react'
import React from 'react'

import { Alert, AlertProps } from './alert'

export default {
    title: 'Components/Alert',
    component: Alert,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'danger',
                    'warning',
                    'success',
                    'info',
                ],
            },
        },
    },
} as Meta

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Default',
    description: 'This is a default alert',
    onClose: () => console.log('ok'),
    icon: <InfoIcon height={16} width={16} />,
}

export const Danger = Template.bind({})
Danger.args = {
    title: 'Danger',
    description: 'This is a danger alert',
    variant: 'danger',
    onClose: () => console.log('danger'),
    icon: <InfoIcon height={16} width={16} />,
}

export const Success = Template.bind({})
Success.args = {
    title: 'Success',
    description: 'This is a success alert',
    variant: 'success',
    onClose: () => console.log('success'),
    icon: <InfoIcon height={16} width={16} />,
}

export const Warning = Template.bind({})
Warning.args = {
    title: 'Warning',
    description: 'This is a warning alert',
    variant: 'warning',
    onClose: () => console.log('warning'),
    icon: <InfoIcon height={16} width={16} />,
}

export const Info = Template.bind({})
Info.args = {
    title: 'Info',
    description: 'This is an info alert',
    variant: 'info',
    onClose: () => console.log('info'),
    icon: <InfoIcon height={16} width={16} />,
}
