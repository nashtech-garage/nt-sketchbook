import { type Meta, type StoryObj } from '@storybook/react'

import { Card, type CardProps } from './card'

export default {
    title: 'Components/Card',
    component: Card,
    argTypes: {
        variant: {
            options: [
                'small',
                'default',
                'success',
                'primary',
                'danger'
            ],
            control: { type: 'select' }
        }
    }
} as Meta

const demoContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const Default: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: demoContent,
        description: 'This is a description',
        footer: 'This is a footer'
    }
}

export const WithFooter: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: demoContent,
        footer: 'This is a card footer.'
    }
}

export const WithIcon: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: demoContent,
        icon: '📊'
    }
}

export const WithDescription: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: demoContent,
        description: 'This is a card description'
    }
}

export const SuccessVariant: StoryObj<CardProps> = {
    args: {
        header: 'Success Card',
        children: demoContent,
        variant: 'success'
    }
}

export const PrimaryVariant: StoryObj<CardProps> = {
    args: {
        header: 'Primary Card',
        children: demoContent,
        variant: 'primary'
    }
}

export const DangerVariant: StoryObj<CardProps> = {
    args: {
        header: 'Danger Card',
        children: demoContent,
        variant: 'danger'
    }
}
