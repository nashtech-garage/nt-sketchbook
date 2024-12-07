const ts = require('typescript')

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        '../../.eslintrc.json',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
        'plugin:storybook/recommended',
        'airbnb',
        'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
    ignorePatterns: [
        'vite.config.ts',
        'typings.d.ts',
        'tailwind.config.js',
        'themes/*',
        '*.stories.mdx',
        '.eslintrc.js',
    ],
    rules: {
        'react/jsx-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-console': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react/require-default-props': 'off',
        'import/prefer-default-export': 'off',
        'react/button-has-type': 'off',
        '@typescript-eslint/semi': 'off',
        'object-curly-newline': 'off',
        'linebreak-style': 'off',
        'no-extraneous-dependencies': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': [
            'error',
            {
                ignorePackages: true,
                pattern: {
                    css: 'always',
                },
            },
        ],
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
        'react/jsx-props-no-spreading': 'off',
        'implicit-arrow-linebreak': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'import/no-cycle': 'off',
        'storybook/prefer-pascal-case': 'off',
        'import/no-named-as-default': 'off',
        '@typescript-eslint/indent': 'off',
        'react/no-danger': 'off',
        'react/no-array-index-key': 'off',
        'max-len': ['off'],
        'operator-linebreak': [
            'error',
            'after',
            { overrides: { '?': 'before', ':': 'before' } },
        ],
        'react/jsx-closing-bracket-location': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/jsx-curly-newline': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'function-paren-newline': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
