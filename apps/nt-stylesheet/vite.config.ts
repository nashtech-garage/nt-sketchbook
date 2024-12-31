/// <reference types='vitest' />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    root: path.resolve(__dirname),
    cacheDir: '../../node_modules/.vite/apps/nt-stylesheet',
    plugins: [
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        dts({
            entryRoot: 'main.ts',
            tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
        }),
    ],
    build: {
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            entry: path.resolve(__dirname, 'main.ts'),
            name: 'nt-stylesheet',
            fileName: 'nt-stylesheet',
            formats: ['cjs'],
            cssFileName: 'nt-stylesheet',
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo?.name === 'style.css')
                        return 'nt-stylesheet.css'
                    return assetInfo?.name
                },
            },
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: [
            '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/apps/nt-stylesheet',
            provider: 'v8',
        },
    },
})
