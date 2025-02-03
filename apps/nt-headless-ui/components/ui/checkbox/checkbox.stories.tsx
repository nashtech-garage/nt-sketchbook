import { Meta, StoryFn } from '@storybook/react'
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
}

export const Checked = Template.bind({})
Checked.args = {
    className: '',
    checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    className: '',
    disabled: true,
}
