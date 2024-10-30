import type { Meta, StoryObj } from '@storybook/react'

import { Loading } from '.'

const meta: Meta<typeof Loading> = {
    component: Loading,
    tags: ['autodocs'],
    title: 'Components/General/Loading',
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg'],
            control: 'select',
        },
    },
}

export default meta

type Story = StoryObj<typeof Loading>

export const DefaultLoading: Story = {}
