import type { Meta, StoryFn } from '@storybook/react'
import { AArrowUp } from 'lucide-react'
import React from 'react'

import type { SelectProps } from './select'
import { Select } from './select'

export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'default',
                    'danger',
                    'success',
                    'warning',
                    'bare'
                ]
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large']
            }
        }
    }
} as Meta

const Template: StoryFn<SelectProps> = (args: SelectProps) => {
    const [value, setValue] = React.useState<string>()

    return (
        <Select
            {...args}
            value={value}
            onChange={(item) => setValue(item)}
        />
    )
}

export const Default = Template.bind({})
Default.args = {
    options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
    ],
    placeholder: 'Select an option'
}

// 🔹 Variants
export const Danger = Template.bind({})
Danger.args = {
    ...Default.args,
    variant: 'danger'
}

export const Success = Template.bind({})
Success.args = {
    ...Default.args,
    variant: 'success'
}

export const Warning = Template.bind({})
Warning.args = {
    ...Default.args,
    variant: 'warning'
}

export const Bare = Template.bind({})
Bare.args = {
    ...Default.args,
    variant: 'bare'
}

// 🔹 Sizes
export const Small = Template.bind({})
Small.args = {
    ...Default.args,
    size: 'small'
}

export const Medium = Template.bind({})
Medium.args = {
    ...Default.args,
    size: 'medium'
}

export const Large = Template.bind({})
Large.args = {
    ...Default.args,
    size: 'large'
}

// 🔹 Groups
export const Group = Template.bind({})
Group.args = {
    groups: [
        {
            label: 'South America',
            options: [
                { value: 'art', label: 'Argentina Time (ART)' },
                { value: 'bot', label: 'Bolivia Time (BOT)' },
                { value: 'brt', label: 'Brasilia Time (BRT)' },
                { value: 'clt', label: 'Chile Standard Time (CLT)' }
            ]
        },
        {
            label: 'Europe & Africa',
            options: [
                { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
                {
                    value: 'cet',
                    label: 'Central European Time (CET)'
                },
                {
                    value: 'eet',
                    label: 'Eastern European Time (EET)'
                },
                {
                    value: 'west',
                    label: 'Western European Summer Time (WEST)'
                },
                { value: 'cat', label: 'Central Africa Time (CAT)' },
                { value: 'eat', label: 'East Africa Time (EAT)' }
            ]
        }
    ],
    placeholder: 'Select an option'
}

// 🔹 Disabled
export const Disable = Template.bind({})
Disable.args = {
    ...Default.args,
    disabled: true
}

// 🔹 With icon
export const Icon = Template.bind({})
Icon.args = {
    ...Default.args,
    iconLeft: <AArrowUp />
}
