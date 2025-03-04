import { Meta, StoryObj } from '@storybook/react'
import { UserIcon } from 'lucide-react'

import { MultipleSelect, MultipleSelectProps } from './multi-select'

const meta = {
    title: 'Components/Multiple select',
    component: MultipleSelect,
    argTypes: {
        variant: {
            options: ['default', 'danger', 'success', 'warning'],
            control: { type: 'select' },
        },
    },
    args: {
        options: [
            {
                value: '1',
                label: 'Option 1',
            },
            {
                value: '2',
                label: 'Option 2',
            },
            {
                value: '3',
                label: 'Option 3',
            },
            {
                value: '4',
                label: 'Option 4',
            },
        ],
        placeholder: 'Select an option',
        onChange: (selected: unknown) => {
            console.log('Selected:', selected)
        },
        initialOption: [
            {
                value: '3',
                label: 'Option 3',
            },
        ],
    },
} as Meta

export default meta

export const Default: StoryObj<MultipleSelectProps> = {
    args: {},
}

export const Danger: StoryObj<MultipleSelectProps> = {
    args: {
        variant: 'danger',
    },
}

export const Success: StoryObj<MultipleSelectProps> = {
    args: {
        variant: 'success',
    },
}

export const Warning: StoryObj<MultipleSelectProps> = {
    args: {
        variant: 'warning',
    },
}
export const WithIcon: StoryObj<MultipleSelectProps> = {
    args: {
        iconLeft: <UserIcon />,
        initialOption: [],
    },
}

export const Disable: StoryObj<MultipleSelectProps> = {
    args: {
        iconLeft: <UserIcon />,
        disabled: true,
        initialOption: [
            {
                value: '3',
                label: 'Option 3',
            },
        ],
    },
}
