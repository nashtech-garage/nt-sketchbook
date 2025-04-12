import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { UploadFileProps } from './upload-file'
import { UploadFile } from './upload-file'

export default {
    argTypes: {},
    component: UploadFile,
    title: 'Components/UploadFile',
} as Meta

const Template: StoryFn<UploadFileProps> = (
    args: UploadFileProps,
) => <UploadFile {...args} />

export const Default: StoryFn<UploadFileProps> = Template.bind({})
Default.args = {}
