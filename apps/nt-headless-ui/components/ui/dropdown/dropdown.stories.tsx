import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Dropdown } from './dropdown'

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    args: {
        items: [
            { label: 'Action' },
            { label: 'Active', active: true },
            { divider: true },
            { label: 'Delete', danger: true }
        ]
    }
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
    args: {
        label: 'Dropdown menu',
        placement: 'down'
    }
}

export const Placements: Story = {
    render: () => (
        <div className="nt-d-flex nt-gap-5">
            <Dropdown
                label="Down"
                placement="down"
                items={[{ label: 'Option 1' }, { label: 'Option 2' }]}
            />
            <Dropdown
                label="Up"
                placement="up"
                items={[{ label: 'Option 1' }, { label: 'Option 2' }]}
            />
            <Dropdown
                label="Left"
                placement="left"
                items={[{ label: 'Option 1' }, { label: 'Option 2' }]}
            />
            <Dropdown
                label="Right"
                placement="right"
                items={[{ label: 'Option 1' }, { label: 'Option 2' }]}
            />
        </div>
    )
}

export const SplitButton: Story = {
    render: () => (
        <Dropdown
            label="..."
            placement="down"
            className="nt-rounded-top-0"
            items={[
                { label: 'Save as Draft' },
                { label: 'Save & Publish' },
                { divider: true },
                { label: 'Cancel' }
            ]}
        >
            <button className="nt-button nt-button-primary nt-rounded-end-0">
                Save Options
            </button>
        </Dropdown>
    )
}

export const WithDangerAndActive: Story = {
    args: {
        label: 'Manage options',
        items: [
            { label: 'View Details' },
            { label: 'Edit', active: true },
            { divider: true },
            { label: 'Delete', danger: true }
        ]
    }
}
