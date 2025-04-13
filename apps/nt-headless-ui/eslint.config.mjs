import { FlatCompat } from '@eslint/eslintrc'
import customConfig from 'eslint-config-custom-lib'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: () => null,
})

const eslintConfig = [
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    ...customConfig,
    {
        languageOptions: {
            parserOptions: {
                project: [
                    path.join(__dirname, './tsconfig.json'),
                    path.join(__dirname, './tsconfig.eslint.json'),
                ],
                tsconfigRootDir: __dirname,
            },
        },
    },
]

export default eslintConfig
