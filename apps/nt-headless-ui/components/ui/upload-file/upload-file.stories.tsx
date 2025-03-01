import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { UploadFile, UploadFileProps } from './upload-file'

export default {
    title: 'Components/UploadFile',
    component: UploadFile,
    argTypes: {},
} as Meta

const Template: StoryFn<UploadFileProps> = (
    args: UploadFileProps,
) => <UploadFile {...args} />

export const Default: StoryFn<UploadFileProps> = Template.bind({})
Default.args = {}
