import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useEffect } from 'react'

import { Checkbox } from './checkbox'

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof Checkbox>

type WithIndeterminateArgs = React.ComponentProps<typeof Checkbox> & {
    indeterminate?: boolean
}

const WithIndeterminate = (args: WithIndeterminateArgs) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = !!args.indeterminate
        }
    }, [args.indeterminate])

    return <Checkbox {...args} ref={checkboxRef} />
}

export const Default: Story = {
    args: {
        className: '',
        label: 'Paragraph label'
    }
}

export const Disabled: Story = {
    args: {
        className: '',
        disabled: true,
        label: 'Paragraph label'
    }
}

export const Checked: Story = {
    args: {
        className: '',
        defaultChecked: true,
        label: 'Paragraph label'
    }
}

export const CheckedDisabled: Story = {
    args: {
        className: '',
        disabled: true,
        label: 'Paragraph label'
    }
}

export const Indeterminate: Story = {
    render: (args) => <WithIndeterminate {...args} />,
    args: {
        className: '',
        label: 'Paragraph label'
    }
}

export const IndeterminateDisabled: Story = {
    render: (args) => <WithIndeterminate {...args} />,
    args: {
        className: '',
        disabled: true,
        label: 'Paragraph label'
    }
}
