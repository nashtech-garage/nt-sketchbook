import { Meta, StoryObj } from '@storybook/react'

import { Avatar, AvatarProps } from './avatar'

const URL_IMAGE = './images/image.png'

const meta: Meta<AvatarProps> = {
    title: 'Components/Avatar',
    component: Avatar,
    args: {
        src: URL_IMAGE,
        fallBack: 'JD',
    },
    argTypes: {
        src: {
            control: 'text',
            description: 'Source URL for the avatar image.',
        },
        fallBack: {
            control: 'text',
            description:
                'Fallback content displayed when the image is unavailable.',
        },
        className: {
            control: 'text',
            description: 'Custom CSS classes for the avatar root.',
        },
        badge: {
            control: 'text',
            description: 'Badge content displayed on the avatar.',
        },
        badgePosition: {
            control: 'select',
            options: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
            ],
            description: 'Position of the badge on the avatar.',
        },
    },
}

export default meta

export const Default: StoryObj<AvatarProps> = {
    args: {
        src: URL_IMAGE,
        fallBack: 'JD',
    },
}

export const NoImage: StoryObj<AvatarProps> = {
    args: {
        src: '',
        fallBack: 'NA',
    },
}

export const CustomSize: StoryObj<AvatarProps> = {
    args: {
        src: URL_IMAGE,
        fallBack: 'CS',
        className: 'h-[100px] w-[100px]',
    },
}

export const NoBadge: StoryObj<AvatarProps> = {
    args: {
        src: URL_IMAGE,
        fallBack: 'JD',
        badge: undefined,
    },
}

export const CustomBadge: StoryObj<AvatarProps> = {
    args: {
        src: URL_IMAGE,
        fallBack: 'JD',
        badge: (
            <span className="bg-red-500 text-white px-1 rounded" />
        ),
        badgePosition: 'bottom-right',
    },
}
