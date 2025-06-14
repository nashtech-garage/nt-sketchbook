import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Checkbox } from './checkbox'

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
} as Meta

const Template: StoryFn = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
    className: '',
    checked: false,
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    className: '',
    checked: false,
    disabled: true,
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}

export const Checked = Template.bind({})
Checked.args = {
    className: '',
    checked: true,
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
    className: '',
    checked: true,
    disabled: true,
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
    className: '',
    checked: 'indeterminate',
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}

export const IndeterminateDisabled = Template.bind({})
IndeterminateDisabled.args = {
    className: '',
    checked: 'indeterminate',
    disabled: true,
    htmlFor: 'paragraph',
    label: 'Paragraph label',
    info: true,
}
