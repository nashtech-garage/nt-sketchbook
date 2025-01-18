import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const URL_IMAGE =
    'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'

const meta: Meta = {
    title: 'Components/Avatar',
    component: Avatar,
    subcomponents: { AvatarImage, AvatarFallback },
    parameters: {
        docs: {
            description: {
                component:
                    'A flexible Avatar component using Radix UI.',
            },
        },
    },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage src={URL_IMAGE} alt="User Avatar" />
            <AvatarFallback>
                <div className="bg-slate-500" />
            </AvatarFallback>
        </Avatar>
    ),
    args: {
        className: '',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default Avatar with an image and fallback text.',
            },
        },
    },
}

export const WithFallbackOnly: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarFallback>
                <div className="bg-slate-500" />
            </AvatarFallback>
        </Avatar>
    ),
    args: {
        className: '',
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar displaying only fallback text.',
            },
        },
    },
}

export const CustomSize: Story = {
    render: (args) => (
        <Avatar {...args}>
            <AvatarImage src={URL_IMAGE} alt="User Avatar" />
            <AvatarFallback>loading..</AvatarFallback>
        </Avatar>
    ),
    args: {
        className: 'h-16 w-16',
    },
    parameters: {
        docs: {
            description: {
                story: 'Avatar with a custom size.',
            },
        },
    },
}
