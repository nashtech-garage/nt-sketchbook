import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Dropdown } from './dropdown'

const mockOption2 = 'Option 2'
const mockOption1 = 'Option 1'
const options = [{ label: mockOption1 }, { label: mockOption2 }]

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
            <Dropdown label="Down" placement="down" items={options} />
            <Dropdown label="Up" placement="up" items={options} />
            <Dropdown label="Left" placement="left" items={options} />
            <Dropdown
                label="Right"
                placement="right"
                items={options}
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
            ]}>
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
