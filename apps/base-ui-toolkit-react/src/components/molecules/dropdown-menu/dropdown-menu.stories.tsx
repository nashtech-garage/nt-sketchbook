import type { Meta, StoryObj } from '@storybook/react'

import { DropdownItem, DropdownItemGroup, DropdownMenu } from '.'

const meta: Meta<typeof DropdownMenu> = {
    component: DropdownMenu,
    tags: ['autodocs'],
    title: 'Components/General/Dropdown menu',
    args: {},
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
    args: {},
    render: () => (
        <DropdownMenu trigger="Page actions" shouldRenderToParent>
            <DropdownItemGroup>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Share</DropdownItem>
                <DropdownItem>Move</DropdownItem>
                <DropdownItem>Clone</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
                <DropdownItem>Report</DropdownItem>
            </DropdownItemGroup>
        </DropdownMenu>
    ),
}
