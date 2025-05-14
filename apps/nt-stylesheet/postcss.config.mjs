/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        autoprefixer: {},
        'postcss-reporter': {
            clearReportedMessages: true,
            throwError: false,
        },

        cssnano:
            process.env.NODE_ENV === 'production'
                ? { preset: 'default' }
                : false,
    }
}

export default config
