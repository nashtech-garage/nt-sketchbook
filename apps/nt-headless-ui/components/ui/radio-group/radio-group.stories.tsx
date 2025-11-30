import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { RadioGroup, type RadioProps } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    argTypes: {
        direction: {
            control: { type: 'radio' },
            options: ['column', 'row']
        }
    }
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const sampleItems: RadioProps[] = [
    { label: 'Option A', name: 'choice', value: '1' },
    { label: 'Option B', name: 'choice', value: '2', disabled: true },
    { label: 'Option C', name: 'choice', value: '3' }
]

export const Default: Story = {
    args: {
        items: sampleItems,
        direction: 'column',
        className: ''
    }
}

export const RowDirection: Story = {
    args: {
        items: sampleItems,
        direction: 'row'
    }
}
