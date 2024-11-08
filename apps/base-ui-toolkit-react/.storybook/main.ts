import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
    stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

    viteFinal: async (config: any) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../src'),
        }
        return config
    },

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm',
        '@chromatic-com/storybook',
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {
            builder: {
                viteConfigPath: '.storybook/vite.config.ts',
            },
        },
    },

    docs: {},

    staticDirs: ['../public'],

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}
export default config
