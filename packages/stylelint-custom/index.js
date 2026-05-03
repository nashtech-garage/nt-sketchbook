import { fileURLToPath } from 'node:url'

const resolveFromConfigPackage = (specifier) =>
    fileURLToPath(import.meta.resolve(specifier))

/** @type {import('stylelint').Config} */
export default {
    extends: [
        resolveFromConfigPackage('stylelint-config-recommended'),
        resolveFromConfigPackage('stylelint-config-standard'),
        resolveFromConfigPackage('stylelint-config-standard-scss'),
        resolveFromConfigPackage('stylelint-config-tailwindcss'),
        resolveFromConfigPackage('stylelint-prettier')
    ],
    plugins: [resolveFromConfigPackage('stylelint-scss')],
    rules: {
        'unit-allowed-list': [
            'em',
            'rem',
            '%',
            's',
            'fr',
            'deg',
            'px',
            'vw',
            'vh'
        ], // Warn when px is used
        'unit-disallowed-list': [['px'], { severity: 'warning' }],
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind']
            }
        ],
        'scss/dollar-variable-empty-line-before': null,
        'declaration-empty-line-before': [
            'never',
            {
                ignore: [
                    'after-comment',
                    'inside-single-line-block',
                    'after-declaration'
                ]
            }
        ],
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: [
                    'scale-font-size',
                    'calculate-line-height'
                ]
            }
        ]
    },
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/*.js',
        '**/*.ts'
    ]
}
