import type { Meta, StoryObj } from '@storybook/react'

import { Label, type LabelProps } from './label'

const meta: Meta<LabelProps> = {
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    args: {
        htmlFor: 'input-id',
        children: 'Label Text',
    },
}

export default meta

type Story = StoryObj<LabelProps>

export const Default: Story = {}

export const CustomClassName: Story = {
    args: {
        className: 'text-red-500 font-bold',
        children: 'Styled Label',
    },
}
