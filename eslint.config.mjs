import {FlatCompat} from '@eslint/eslintrc';
import nxEslintPlugin from '@nx/eslint-plugin';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

const compat = new FlatCompat({
    baseConfig: {
        plugins: ['@typescript-eslint', '@nx', 'prettier'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@nx/recommended',
            'prettier',
            'plugin:prettier/recommended',
        ],
    },
});

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
        ignores: ['apps/**/coverage/**', 'apps/**/dist/**', 'apps/**/.nx/**'],
        rules: {
            'prettier/prettier': [
                'error',
                {},
                {
                    fileInfoOptions: {
                        withNodeModules: true,
                    },
                },
            ],
            'brace-style': ['error', '1tbs'],
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
];
