import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import autoprefixer from 'autoprefixer'
import * as path from 'path'
import dtsPlugin from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    root: path.resolve(__dirname),

    plugins: [
        dtsPlugin({
            include: ['src'],
            exclude: ['**/*.test.ts', '**/__tests__/**'],
        }),
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
        ]),
        nxCopyAssetsPlugin([
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
            preserveEntrySignatures: 'strict',
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
                        return 'integrations/tailwind/index.cjs'
                    }

                    if (name === 'scripts/index') {
                        return 'scripts/nt.cjs'
                    }

                    return '[name].cjs'
                },
                assetFileNames: (assetInfo) => {
                    if (
                        assetInfo.name?.endsWith('.css') &&
                        assetInfo.originalFileNames?.includes(
                            'src/integrations/tailwind/index.ts',
                        )
                    ) {
                        return 'integrations/tailwind/style.css'
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
    css: {
        preprocessorOptions: {},
        postcss: {
            plugins: [autoprefixer()],
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
    test: {
        watch: false,
        globals: true,
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['json', 'cobertura', 'json-summary', 'lcov'],
            reportOnFailure: true,
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
