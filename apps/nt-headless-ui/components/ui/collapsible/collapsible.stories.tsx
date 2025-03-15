import { Button } from '@headless-ui/components/radix/button'
import type { Meta, StoryObj } from '@storybook/react'

import { Collapsible } from './collapsible'

const meta: Meta<typeof Collapsible> = {
    title: 'Components/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
    render: () => (
        <Collapsible trigger={<Button>Toggle Content</Button>}>
            <p>This is the collapsible content.</p>
        </Collapsible>
    ),
}
