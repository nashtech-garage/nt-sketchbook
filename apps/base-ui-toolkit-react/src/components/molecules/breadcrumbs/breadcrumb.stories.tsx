import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { BreadcrumbItem, Breadcrumbs, colorClasses } from '.'

const meta: Meta<typeof Breadcrumbs> = {
    component: Breadcrumbs,
    title: 'Components/General/Breadcrumb',
    args: {
        isDisabled: false,
    },
    argTypes: {
        size: {
            options: ['sm', 'md', 'lg'],
            control: 'select',
        },
        variant: {
            options: ['solid', 'bordered', 'light'],
            control: 'select',
        },
        color: {
            options: Object.keys(
                colorClasses,
            ) as (keyof typeof colorClasses)[],
            control: 'select',
        },
    },
}

export default meta

type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
    args: {
        size: 'sm',
    },
    render: (args) => (
        <Breadcrumbs
            color={args.color}
            size={args.size}
            variant={args.variant}
            separator="/"
            isDisabled={args.isDisabled}
            onAction={(key) =>
                console.log(`Clicked item with key: ${key}`)
            }
        >
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
        </Breadcrumbs>
    ),
}

export const Controlled: Story = {
    args: {
        size: 'sm',
    },
    render: (args) => {
        const [currentPage, setCurrentPage] =
            useState<React.Key>('home')
        return (
            <Breadcrumbs
                color={args.color}
                size={args.size}
                variant={args.variant}
                separator="/"
                isDisabled={args.isDisabled}
                onAction={(key) => {
                    console.log(key)
                    setCurrentPage(key)
                }}
            >
                <BreadcrumbItem
                    key="home"
                    isCurrent={currentPage === 'home'}
                >
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem
                    key="music"
                    isCurrent={currentPage === 'music'}
                >
                    Music
                </BreadcrumbItem>
                <BreadcrumbItem
                    key="artist"
                    isCurrent={currentPage === 'artist'}
                >
                    Artist
                </BreadcrumbItem>
                <BreadcrumbItem
                    key="album"
                    isCurrent={currentPage === 'album'}
                >
                    Album
                </BreadcrumbItem>
                <BreadcrumbItem
                    key="song"
                    isCurrent={currentPage === 'song'}
                >
                    Song
                </BreadcrumbItem>
            </Breadcrumbs>
        )
    },
}
