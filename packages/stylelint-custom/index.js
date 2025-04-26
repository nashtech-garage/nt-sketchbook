/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-tailwindcss',
        'stylelint-prettier',
    ],
    plugins: ['stylelint-scss'],
    rules: {
        'unit-allowed-list': ['em', 'rem', '%', 's'],
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind'],
            },
        ],
        'scss/dollar-variable-empty-line-before': null,
    },
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.js',
        '**/*.ts',
    ],
}
