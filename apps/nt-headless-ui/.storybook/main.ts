// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)

function getAbsolutePath(value: string): string {
    return dirname(require.resolve(join(value, 'package.json')))
}

const config = {
    stories: [
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
        '../stories/**/*.@(mdx|tsx)',
        '../components/**/*.@(mdx)'
    ],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-docs')
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs-vite'),
        options: {}
    },

    staticDirs: [
        '../public',
        {
            from: '../node_modules/@nashtech-garage/stylesheet/dist/assets',
            to: '/assets'
        }
    ],

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
}

export default config
