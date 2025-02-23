/// <reference types='vitest' />

import { defineConfig } from "vite";
import * as path from "path";
import autoprefixer from 'autoprefixer'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
    root: path.resolve(__dirname),
    plugins: [
        nxViteTsPaths(),
        nxCopyAssetsPlugin([{
            input:  './src/styles',
            output: 'styles',
            glob: "*.scss",
        }]),
        nxCopyAssetsPlugin([{
            input:  './docs',
            output: 'docs',
            glob: "*.md",
        }]),
        nxCopyAssetsPlugin([{
            input:  './integrations',
            output: './integrations/tailwind',
            glob: "*.ts",
        }]),
    ],
    build: {
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            entry: {
                index: './src/index.ts',
                'tailwind-integrations': './src/integrations/tailwind/index.ts',
            },
            name: "nt-stylesheet",
            formats: ["cjs"],
        },
        rollupOptions: {
            output: {
                entryFileNames: ({ name }) => {
                    if (name === 'tailwind-integrations') return 'integrations/tailwind/index.cjs';

                    return '[name].cjs';
                }
            },
        },
    },
    css: {
        preprocessorOptions: {},
        postcss: {
            plugins: [autoprefixer]
        },
    },
    test: {
        watch: false,
        globals: true,
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reporter: ['cobertura', 'lcov', 'json-summary', 'json'],
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
});
