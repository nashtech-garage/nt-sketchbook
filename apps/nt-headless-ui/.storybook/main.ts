import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
        '../components/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chromatic-com/storybook',
        '@storybook/addon-themes'
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {}
    },
    staticDirs: ['../public'],
    docs: {
        autodocs: 'tag'
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
}

export default config
