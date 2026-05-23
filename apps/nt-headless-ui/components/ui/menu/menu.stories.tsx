import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
    Check,
    ChevronRight,
    Clock,
    Folder,
    MoreHorizontal,
    Search,
    Settings,
    Trash2,
    Users
} from 'lucide-react'

import { Menu } from './menu'

const meta: Meta<typeof Menu> = {
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
    args: {
        sections: [
            {
                title: 'Workspace',
                items: [
                    {
                        label: 'Projects',
                        icon: <Folder size={16} />,
                        active: true,
                        shortcut: 'Cmd+P'
                    },
                    {
                        label: 'Team members',
                        icon: <Users size={16} />,
                        badge: '8'
                    },
                    {
                        label: 'Settings',
                        icon: <Settings size={16} />
                    }
                ]
            },
            {
                items: [
                    {
                        label: 'Delete workspace',
                        icon: <Trash2 size={16} />,
                        danger: true
                    }
                ]
            }
        ]
    }
}

export const WithDescriptions: Story = {
    args: {
        sections: [
            {
                title: 'Recent',
                items: [
                    {
                        label: 'Design system',
                        description: 'Updated 12 minutes ago',
                        icon: <Clock size={16} />
                    },
                    {
                        label: 'Product roadmap',
                        description: 'Shared with product team',
                        icon: <MoreHorizontal size={16} />
                    }
                ]
            }
        ]
    }
}

export const Compact: Story = {
    args: {
        variant: 'compact',
        items: [
            {
                label: 'Overview',
                active: true
            },
            {
                label: 'Activity'
            }
        ]
    }
}

export const Select: Story = {
    args: {
        variant: 'select',
        sections: [
            {
                title: 'Status',
                items: [
                    {
                        label: 'Active',
                        active: true,
                        color: 'var(--nt-color-success)',
                        check: <Check size={16} />
                    },
                    {
                        label: 'Paused',
                        color: 'var(--nt-color-warning)'
                    }
                ]
            }
        ]
    }
}

export const Searchable: Story = {
    args: {
        variant: 'search',
        search: {
            icon: <Search size={14} />,
            placeholder: 'Search people'
        },
        scrollable: true,
        items: [
            {
                label: 'Anna Nguyen'
            },
            {
                label: 'Minh Tran'
            }
        ]
    }
}

export const EmptySearch: Story = {
    args: {
        variant: 'search',
        search: {
            icon: <Search size={14} />,
            placeholder: 'Search people'
        },
        empty: 'No results found'
    }
}

export const Sidebar: Story = {
    args: {
        variant: 'sidebar',
        sections: [
            {
                title: 'Navigation',
                items: [
                    {
                        label: 'Projects',
                        icon: <Folder size={16} />,
                        active: true
                    },
                    {
                        label: 'Members',
                        icon: <Users size={16} />
                    }
                ]
            }
        ]
    }
}

export const NestedSubmenu: Story = {
    args: {
        items: [
            {
                label: 'More actions',
                chevron: <ChevronRight size={16} />,
                items: [
                    {
                        label: 'Archive'
                    },
                    {
                        label: 'Remove',
                        danger: true
                    }
                ]
            }
        ]
    }
}
