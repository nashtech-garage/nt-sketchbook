import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import * as path from 'path'
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'
import postcssReporter from 'postcss-reporter'
import dtsPlugin from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => {
    const outputPath = path.resolve(__dirname, 'dist')

    return {
        root: __dirname,
        publicDir: 'public',
        plugins: [
            dtsPlugin({
                include: ['src'],
                exclude: ['**/*.test.ts', '**/__tests__/**'],
                outDir: `${outputPath}/types`,
                entryRoot: 'src',
                copyDtsFiles: true
            }),
            nxViteTsPaths(),
            nxCopyAssetsPlugin([
                {
                    input: './docs',
                    output: 'docs',
                    glob: '*.md'
                },
                {
                    input: './src/fonts',
                    output: 'fonts',
                    glob: '**/*'
                },
                {
                    input: './examples',
                    output: 'examples',
                    glob: '**/*'
                },
                {
                    input: '.',
                    output: '',
                    glob: 'components-manifest.json'
                },
                ,
                {
                    input: '.',
                    output: '',
                    glob: 'index.html'
                }
            ])
        ],
        build: {
            sourcemap: true,
            emptyOutDir: true,
            reportCompressedSize: true,
            cssCodeSplit: true,
            commonjsOptions: {
                transformMixedEsModules: true
            },
            rollupOptions: {
                preserveEntrySignatures: 'strict',
                input: {
                    'nt-icons': path.resolve(
                        __dirname,
                        'src/styles/_icons.scss'
                    ),
                    nt: path.resolve(
                        __dirname,
                        'src/styles/_site.scss'
                    ),
                    'scripts/index': path.resolve(
                        __dirname,
                        'src/scripts/index.ts'
                    ),
                    'scripts/nt-menu-toggle': path.resolve(
                        __dirname,
                        'src/scripts/nt-menu-toggle.ts'
                    ),
                    tailwindIntegrations: path.resolve(
                        __dirname,
                        'src/integrations/tailwind/index.ts'
                    )
                },
                output: {
                    dir: outputPath,
                    format: 'es',
                    preserveModules: false,
                    entryFileNames: ({ name }) => {
                        if (name === 'tailwindIntegrations') {
                            return 'integrations/tailwind/index.js'
                        }

                        if (name === 'scripts/index') {
                            return 'scripts/nt.js'
                        }

                        return '[name].js'
                    },
                    assetFileNames: (assetInfo) => {
                        if (
                            assetInfo.name?.endsWith('.css') &&
                            assetInfo.originalFileNames?.includes(
                                'src/integrations/tailwind/index.ts'
                            )
                        ) {
                            return 'integrations/tailwind/style.css'
                        }

                        if (
                            assetInfo.name?.endsWith('nt-icons.css')
                        ) {
                            return 'css/nt-icons.css'
                        }

                        if (assetInfo.name?.endsWith('.css')) {
                            return 'css/[name][extname]'
                        }

                        return 'assets/[name][extname]'
                    }
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use 'sass:math'; @use 'sass:map';`
                }
            },
            postcss: {
                plugins: [
                    postcssImport(),
                    autoprefixer(),
                    postcssNesting(),
                    postcssPresetEnv({
                        stage: 1,
                        features: {
                            'custom-properties': true,
                            'nesting-rules': true
                        }
                    }),
                    postcssReporter({
                        clearReportedMessages: true,
                        throwError: false
                    }),
                    cssnano({ preset: 'default' })
                ]
            }
        },
        optimizeDeps: {
            exclude: ['materialdesignicons.min.css']
        },
        resolve: {
            alias: {
                'materialdesignicons.min.css': path.resolve(
                    __dirname,
                    'node_modules/@mdi/font/css/materialdesignicons.min.css'
                )
            }
        },
        test: {
            watch: false,
            environment: 'jsdom',
            globals: true,
            include: [
                '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
            ],
            reporters: ['default'],
            coverage: {
                provider: 'v8',
                reporter: [
                    'json',
                    'cobertura',
                    'json-summary',
                    'lcov'
                ],
                reportOnFailure: true
            },
            exclude: [
                '**/vite.config.{ts,mts}',
                '**/vitest.config.{ts,mts}',
                'tailwind.config.ts',
                '**/node_modules/**',
                '**/dist/**'
            ]
        }
    }
})
