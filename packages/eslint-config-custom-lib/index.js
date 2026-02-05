import prettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import sortKeysPlugin from 'eslint-plugin-typescript-sort-keys'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

import baseConfig from '../../eslint.config.mjs'

export default [
    ...baseConfig,
    {
        files: ['**/*.{js,cjs,mjs,ts,tsx,jsx}'],
        plugins: {
            'testing-library': pluginTestingLibrary,
            'unused-imports': pluginUnusedImports,
            'typescript-sort-keys': sortKeysPlugin
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
            'object-shorthand': 'error',
            'prettier/prettier': 'error',
            'typescript-sort-keys/interface': [
                'error',
                'asc',
                {
                    caseSensitive: false,
                    natural: true,
                    requiredFirst: true
                }
            ]
        }
    },
    {
        files: ['**/*.spec.tsx', '**/*.spec.ts'],
        rules: {
            'no-useless-escape': 'off'
        }
    },
    prettierRecommended,
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
            'tailwind.config.**',
            'stylelint.config.**',
            'eslint.config.mjs',
            '**/storybook-static/**',
            'vite.config.**',
            'vitest.config.**',
            '**/next-env.d.ts',
            '**/.storybook/**',
            '**/.next/**'
        ]
    }
]
