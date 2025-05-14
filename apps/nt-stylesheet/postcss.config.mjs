/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        autoprefixer: {},
        tailwindcss: {},
        'postcss-reporter': {
            clearReportedMessages: true,
            throwError: false,
        },
        cssnano:
            process.env.NODE_ENV === 'production'
                ? { preset: 'default' }
                : false,
    },
}

export default config
