/// <reference types="vitest/config" />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import * as path from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

export default defineConfig({
    root: path.resolve(__dirname),
    plugins: [
        dtsPlugin(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin([
            {
                input: './src/styles',
                output: 'scss',
                glob: '*.scss',
            },
            {
                input: './docs',
                output: 'docs',
                glob: '*.md',
            },
            {
                input: './integrations',
                output: './integrations/tailwind',
                glob: '*.ts',
            },
        ]),
    ],
    build: {
        sourcemap: true,
        emptyOutDir: true,
        reportCompressedSize: true,
        cssCodeSplit: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            input: {
                'styles/index': path.resolve(
                    __dirname,
                    'src/styles/index.ts',
                ),
                'scripts/index': path.resolve(
                    __dirname,
                    'src/scripts/index.ts',
                ),
                'scripts/nt-menu-toggle': path.resolve(
                    __dirname,
                    'src/scripts/nt-menu-toggle.ts',
                ),
                'integrations/tailwind/index': path.resolve(
                    __dirname,
                    'src/integrations/tailwind/index.ts',
                ),
            },
            output: {
                dir: 'dist',
                format: 'cjs',
                entryFileNames: ({ name }) => {
                    if (name === 'integrations/tailwind/index') {
                        return 'integrations/tailwind/index.js'
                    }

                    if (name === 'scripts/index') {
                        return 'scripts/nt.js'
                    }

                    return '[name].js'
                },
                assetFileNames: (assetInfo) => {
                    console.log(
                        'assetInfo>>>>',
                        assetInfo.originalFileNames,
                    )

                    if (
                        assetInfo.name?.endsWith('.css') &&
                        assetInfo.originalFileNames?.includes(
                            'src/integrations/tailwind/index.ts',
                        )
                    ) {
                        return 'integrations/tailwind/index.css'
                    }

                    if (
                        assetInfo.name?.endsWith('.css') &&
                        assetInfo.originalFileNames?.includes(
                            'src/styles/index.ts',
                        )
                    ) {
                        return 'css/nt.css'
                    } else if (assetInfo.name?.endsWith('.css')) {
                        return 'css/[name].css'
                    }

                    return 'assets/[name][extname]'
                },
            },
        },
    },
    optimizeDeps: {
        exclude: ['materialdesignicons.min.css'],
    },
    resolve: {
        alias: {
            'materialdesignicons.min.css': path.resolve(
                __dirname,
                'node_modules/@mdi/font/css/materialdesignicons.min.css',
            ),
        },
    },
    css: {
        preprocessorOptions: {},
        postcss: path.resolve(__dirname, 'postcss.config.js'),
    },
    test: {
        watch: false,
        globals: true,
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['json', 'cobertura', 'json-summary', 'lcov'],
            reportOnFailure: true
        },
        exclude: [
            '**/vite.config.{ts,mts}',
            '**/vitest.config.{ts,mts}',
            'tailwind.config.ts',
            '**/node_modules/**',
            '**/dist/**',
        ],
    },
})
