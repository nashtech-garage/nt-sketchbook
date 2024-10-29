import type { Meta, StoryObj } from '@storybook/react'

import { ProgressTracker } from '.'

const meta: Meta<typeof ProgressTracker> = {
    component: ProgressTracker,
    tags: ['ProgressTracker'],
    title: 'Components/General/Progress tracker',
    args: {
        items: [
            {
                id: 'welcome',
                label: 'Welcome',
                status: 'disabled',
            },
            {
                id: 'create-space',
                label: 'Create a space',
                status: 'visited',
            },
            {
                id: 'upload-photo',
                label: 'Upload a photo',
                status: 'visited',
            },
            {
                id: 'your-details',
                label: 'Your details',
                status: 'current',
            },
            {
                id: 'invite-users',
                label: 'Invite users',
                status: 'unvisited',
            },
            {
                id: 'confirmation',
                label: 'Confirmation',
                status: 'unvisited',
            },
        ],
    },
}

export default meta

type Story = StoryObj<typeof ProgressTracker>

export const Default: Story = {}

export const Comfortable: Story = {
    args: {
        spacing: 'comfortable',
    },
}
