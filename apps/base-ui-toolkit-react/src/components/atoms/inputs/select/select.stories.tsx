import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'

const meta: Meta<typeof Select> = {
    component: Select,
    tags: ['autodocs'],
    title: 'Components/Data Entry/Select',
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
    args: {
        options: [
            {
                value: 1,
                label: 'Moto',
            },
            {
                value: 2,
                label: 'Car',
            },
            {
                value: 3,
                label: 'Airplane',
            },
        ],
    },
}

export const SearchEnable: Story = {
    args: {
        options: [
            {
                value: 1,
                label: 'Moto',
            },
            {
                value: 2,
                label: 'Car',
            },
            {
                value: 3,
                label: 'Airplane',
            },
        ],
        isSearchable: true,
    },
}

export const Disabled: Story = {
    args: {
        options: [
            {
                value: 1,
                label: 'Moto',
            },
            {
                value: 2,
                label: 'Car',
            },
            {
                value: 3,
                label: 'Airplane',
            },
        ],
        isSearchable: true,
        isDisabled: true,
        className: '',
    },
}

export const Multiple: Story = {
    args: {
        options: [
            {
                value: 1,
                label: 'Moto',
            },
            {
                value: 2,
                label: 'Car',
            },
            {
                value: 3,
                label: 'Airplane',
            },
        ],
        isSearchable: true,
        isDisabled: false,
        isMultipleSelect: true,
    },
}
