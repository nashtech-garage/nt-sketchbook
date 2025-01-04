import { FlatCompat } from '@eslint/eslintrc'
import nxEslintPlugin from '@nx/eslint-plugin'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

const compat = new FlatCompat({
    baseConfig: {
        plugins: ['@typescript-eslint', '@nx'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@nx/recommended',
        ],
    },
})

export default [
    {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            '@nx': nxEslintPlugin,
        },
        ignores: ['coverage/**', 'dist/**'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    ...compat.config({
        overrides: [
            {
                files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            },
        ],
    }),
]
