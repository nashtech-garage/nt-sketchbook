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

export const Default: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is the main content of the card.',
        description: 'This is a description',
        footer: 'This is a footer'
    }
}

export const WithFooter: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is the main content of the card.',
        footer: 'This is a card footer.'
    }
}

export const WithIcon: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is the main content of the card.',
        icon: '📊'
    }
}

export const WithDescription: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is the main content of the card.',
        description: 'This is a card description'
    }
}

export const SuccessVariant: StoryObj<CardProps> = {
    args: {
        header: 'Success Card',
        children: 'This is the main content of the card.',
        variant: 'success'
    }
}

export const PrimaryVariant: StoryObj<CardProps> = {
    args: {
        header: 'Primary Card',
        children: 'This is the main content of the card.',
        variant: 'primary'
    }
}

export const DangerVariant: StoryObj<CardProps> = {
    args: {
        header: 'Danger Card',
        children: 'This is the main content of the card.',
        variant: 'danger'
    }
}
