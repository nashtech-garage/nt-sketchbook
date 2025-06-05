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
                'danger',
            ],
            control: { type: 'select' },
        },
    },
} as Meta

export const Default: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        description: 'This is a description',
        footer: 'This is a footer',
    },
}

export const WithFooter: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        footer: 'This is a card footer.',
    },
}

export const WithIcon: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        icon: '📊',
    },
}

export const WithDescription: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        description: 'This is a card description',
    },
}

export const SuccessVariant: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        variant: 'success',
    },
}

export const PrimaryVariant: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        variant: 'primary',
    },
}

export const DangerVariant: StoryObj<CardProps> = {
    args: {
        header: 'Card Title',
        children: 'This is a card content.',
        variant: 'danger',
    },
}
