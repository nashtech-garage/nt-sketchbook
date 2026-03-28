import { fixupPluginRules } from '@eslint/compat'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import sortKeysPlugin from 'eslint-plugin-typescript-sort-keys'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import baseConfig from '../../eslint.config.mjs'

export default [
    ...baseConfig,
    {
        files: ['**/*.{js,cjs,mjs,ts,tsx,jsx}'],
        plugins: {
            prettier: fixupPluginRules(pluginPrettier),
            'testing-library': fixupPluginRules(pluginTestingLibrary),
            'unused-imports': fixupPluginRules(pluginUnusedImports),
            'typescript-sort-keys': fixupPluginRules(sortKeysPlugin)
        },
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            'import/order': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': 'error',
            'react/react-in-jsx-scope': 'off',
            'arrow-body-style': ['warn', 'as-needed'],
            'object-shorthand': 'error',
            'prettier/prettier': 'error'
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
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
        files: ['**/*.spec.{ts,tsx}'],
        rules: {
            'no-useless-escape': 'off',
            'no-restricted-syntax': [
                'warn',
                {
                    selector:
                        'Program:not(:has(FunctionDeclaration[id.name="setup"], VariableDeclarator[id.name="setup"][init.type=/FunctionExpression$/]))',
                    message:
                        "Test files must include a 'setup' function."
                }
            ]
        }
    },
    eslintConfigPrettier,
    {
        ignores: [
            '**/reports/**',
            '**/tsconfig.tsbuildinfo',
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.nx/**',
            '**/coverage/**',
            '**/postcss.config.mjs',
            '**/tailwind.config.**',
            '**/stylelint.config.**',
            '**/eslint.config.mjs',
            '**/storybook-static/**',
            '**/vite.config.**',
            '**/vitest.config.**',
            '**/next-env.d.ts',
            '**/.storybook/**',
            '**/.next/**'
        ]
    }
]
