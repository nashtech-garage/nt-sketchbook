import type { Meta, StoryFn } from '@storybook/react'
import React, { useEffect } from 'react'

import { Checkbox } from './checkbox'

export default {
    title: 'Components/Checkbox',
    component: Checkbox
} as Meta

const Template: StoryFn = (args) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = !!args.indeterminate
        }
    }, [args.indeterminate])

    return <Checkbox {...args} ref={checkboxRef} />
}

export const Default = Template.bind({})
Default.args = {
    className: '',
    label: 'Paragraph label'
}

export const Disabled = Template.bind({})
Disabled.args = {
    className: '',
    disabled: true,
    label: 'Paragraph label'
}

export const Checked = Template.bind({})
Checked.args = {
    className: '',
    defaultChecked: true,
    label: 'Paragraph label'
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
    className: '',
    disabled: true,
    label: 'Paragraph label'
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
    className: '',
    indeterminate: true,
    label: 'Paragraph label'
}

export const IndeterminateDisabled = Template.bind({})
IndeterminateDisabled.args = {
    className: '',
    indeterminate: true,
    disabled: true,
    label: 'Paragraph label'
}
