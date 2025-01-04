import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
    ...compat.config({
        plugins: ['@nrwl/nx'],
        overrides: [
            {
                files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
                rules: {
                    '@nrwl/nx/enforce-module-boundaries': [
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
            {
                files: ['*.ts', '*.tsx'],
            },
        ],
    }),
]
