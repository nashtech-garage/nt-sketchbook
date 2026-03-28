import customConfig from 'eslint-config-custom-lib'
import storybook from 'eslint-plugin-storybook'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default tseslint.config(
    ...tseslint.configs.recommended,
    ...customConfig,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: [
                    './tsconfig.json',
                    './tsconfig.eslint.json'
                ],
                tsconfigRootDir: __dirname
            }
        }
    },
    ...storybook.configs['flat/recommended'],
    {
        ignores: ['dist/', 'node_modules/', 'build/', '!.storybook/']
    }
)
