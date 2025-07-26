/** @type {import('postcss-load-config').Config} */
import postcssNesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'

const config = {
    plugins: {
        autoprefixer: {},
        tailwindcss: {},
        'postcss-nesting': postcssNesting(),
        'postcss-preset-env': postcssPresetEnv({
            stage: 1,
            features: {
                'custom-properties': true,
                'nesting-rules': true
            }
        }),
        'postcss-reporter': {
            clearReportedMessages: true,
            throwError: false
        },
        cssnano:
            process.env.NODE_ENV === 'production'
                ? { preset: 'default' }
                : false
    }
}

export default config
