import type { Meta, StoryObj } from '@storybook/react'

import { LoadingDialog } from '.'

const meta: Meta<typeof LoadingDialog> = {
    component: LoadingDialog,
    tags: ['autodocs'],
    title: 'Components/General/Loading dialog',
}

export default meta

type Story = StoryObj<typeof LoadingDialog>

export const DefaultLoading: Story = {
    args: {
        isOpen: true,
    },
}
