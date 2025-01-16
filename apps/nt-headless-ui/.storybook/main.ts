import { dirname, join } from 'path'

module.exports = {
    stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@chromatic-com/storybook'),
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    docs: {
        autodocs: true,
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}

function getAbsolutePath(value: string): string {
    return dirname(require.resolve(join(value, 'package.json')))
}
