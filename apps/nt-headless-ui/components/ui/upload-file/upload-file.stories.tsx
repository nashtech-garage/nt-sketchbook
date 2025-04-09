import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { UploadFileProps } from './upload-file'
import { UploadFile } from './upload-file'

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
