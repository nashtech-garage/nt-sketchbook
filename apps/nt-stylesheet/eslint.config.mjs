import customConfig from 'eslint-config-custom-lib'
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

    {
        ignores: [
            '**/dist/**',
            '**/node_modules/**',
            '**/build/**',
            '**/.nx/**'
        ]
    }
)
