import pluginTestingLibrary from 'eslint-plugin-testing-library'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

import baseConfig from '../../eslint.config.mjs'

export default [
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            'testing-library': pluginTestingLibrary,
            'unused-imports': pluginUnusedImports,
        },
        rules: {
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'import/order': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': 'error',
            'react/react-in-jsx-scope': 'off',
            'arrow-body-style': ['warn', 'as-needed'],
        },
    },

    {
        files: ['**/*.spec.tsx', '**/*.spec.ts'],
        rules: {
            'no-useless-escape': 'off',
        },
    },

    {
        ignores: [
            'reports',
            'tsconfig.tsbuildinfo',
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.nx/**',
            '**/coverage/**',
            'postcss.config.mjs',
            'tailwind.config.js',
            'stylelint.config.js',
            'eslint.config.mjs',
        ],
    },
]
