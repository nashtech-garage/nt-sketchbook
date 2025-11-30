import type { Meta, StoryFn } from '@storybook/nextjs-vite'

import type { PopoverProps } from './popover'
import { Popover } from './popover'

export default {
    title: 'Components/Popover',
    component: Popover,
    argTypes: {
        trigger: { control: 'text' },
        children: { control: 'text' },
        align: {
            control: 'select'
        },
        side: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left']
        },
        variant: {
            control: 'select',
            options: [
                'default',
                'success',
                'danger',
                'warning',
                'info'
            ]
        }
    }
} as Meta<typeof Popover>

const Template: StoryFn<typeof Popover> = (args: PopoverProps) => (
    <Popover {...args}>
        <div className="nt-p-2">
            <h2 className="nt-text-sm nt-font-bold">
                Popover Example
            </h2>
            <p>This is an example of a popover component.</p>
        </div>
    </Popover>
)

export const Default: StoryFn<typeof Popover> = Template.bind({})
Default.args = {
    trigger: <button>Click me</button>
}

export const CustomContent: StoryFn<typeof Popover> = Template.bind(
    {}
)
CustomContent.args = {
    trigger: <span>Hover over me</span>,
    children: (
        <div>
            <h4>Custom Content</h4>
            <p>This is a custom popover content with more details.</p>
        </div>
    )
}
