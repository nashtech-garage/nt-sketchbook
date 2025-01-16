import { FlatCompat } from '@eslint/eslintrc'
import nxEslintPlugin from '@nx/eslint-plugin'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import { fileURLToPath } from 'url'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {}
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
            prettier: prettierPlugin,
        },
        ignores: [
            'apps/**/coverage/**',
            'apps/**/dist/**',
            'apps/**/.nx/**',
        ],
        rules: {
            'brace-style': ['error', '1tbs'],
            semi: ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
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
    ...compat.extends('eslint:recommended', 'prettier'),
]
