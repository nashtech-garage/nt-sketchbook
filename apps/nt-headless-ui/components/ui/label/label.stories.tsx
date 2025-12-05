import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Label, type LabelProps } from './label'

const meta: Meta<LabelProps> = {
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    args: {
        htmlFor: 'input-id',
        children: 'Label Text',
        variant: 'form-field'
    }
}

export default meta

type Story = StoryObj<LabelProps>

export const Default: Story = {}

export const HintVariant: Story = {
    args: {
        variant: 'hint',
        children: 'This is a hint label'
    }
}

export const FormFieldVariant: Story = {
    args: {
        variant: 'form-field',
        children: 'This is a form field label'
    }
}

export const CustomClassName: Story = {
    args: {
        className: 'text-red font-bold',
        children: 'Styled Label'
    }
}
