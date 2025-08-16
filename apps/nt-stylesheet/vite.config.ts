import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import * as path from 'path'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

import {
    assetCopies,
    assetFileNames,
    makeInputs,
    OUT_DIR,
    ROOT
} from './vite.common'

export default defineConfig(() => {
    const inputs = makeInputs()

    return {
        root: ROOT,
        publicDir: 'public',
        plugins: [
            dtsPlugin({
                include: ['src'],
                exclude: ['**/*.test.ts', '**/__tests__/**'],
                outDir: `${OUT_DIR}/types`,
                entryRoot: 'src',
                copyDtsFiles: true
            }),
            nxViteTsPaths(),
            nxCopyAssetsPlugin(assetCopies())
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
                input: inputs,
                output: {
                    dir: OUT_DIR,
                    format: 'es',
                    preserveModules: false,
                    entryFileNames: ({ name }) => {
                        if (name === 'tailwindIntegrations')
                            return 'integrations/tailwind/index.js'
                        if (name === 'scripts/index')
                            return 'scripts/nt.js'
                        return '[name].js'
                    },
                    assetFileNames: assetFileNames
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use 'sass:math'; @use 'sass:map';`
                }
            }
            // PostCSS is auto-loaded from postcss.config.cjs
        },
        optimizeDeps: {
            exclude: ['materialdesignicons.min.css']
        },
        resolve: {
            alias: {
                'materialdesignicons.min.css': path.resolve(
                    ROOT,
                    'node_modules/@mdi/font/css/materialdesignicons.min.css'
                )
            }
        }
    }
})
