import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Select, SelectProps } from './select'

export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {},
} as Meta

const Template: StoryFn<SelectProps> = (args: SelectProps) => (
    <Select {...args} />
)

export const Default = Template.bind({})
Default.args = {}
