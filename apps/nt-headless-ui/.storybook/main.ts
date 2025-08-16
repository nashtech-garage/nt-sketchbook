module.exports = {
    stories: [
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
        '../stories/**/*.@(mdx|tsx)',
        '../components/**/*.@(mdx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@chromatic-com/storybook'
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {}
    },
    staticDirs: [
        '../public',
        {
            from: '../node_modules/@nashtech-garage/stylesheet/dist/assets/fonts',
            to: '/assets/fonts'
        }
    ],
    docs: {
        autodocs: true
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
}
