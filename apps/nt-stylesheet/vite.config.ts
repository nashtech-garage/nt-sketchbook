import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig, UserConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { generateIconCss } from './vite/plugins/vite-plugin-lucide-icons/vite-plugin-lucide-icons'

import path from 'path'
import { assetCopies } from './vite/copy-assets'
import { makeInputs, themeManifestPlugin } from './vite/inputs'
import { assetFileNames } from './vite/output'
import { OUT_DIR, ROOT } from './vite/paths'
import { previewPlugin } from './vite/preview'

export default defineConfig(() => {
    const inputs = makeInputs()

    return {
        root: ROOT,
        publicDir: 'public',
        plugins: [
            dtsPlugin({
                include: ['src'],
                exclude: ['**/*.spec.ts'],
                outDir: `${OUT_DIR}/types`,
                entryRoot: 'src',
                copyDtsFiles: true
            }),
            nxViteTsPaths(),
            nxCopyAssetsPlugin(assetCopies()),
            themeManifestPlugin(inputs),
            generateIconCss({
                output: `css/nt-icons.css`,
                iconSize: 14
            }),
            previewPlugin(),
            viteStaticCopy({
                targets: [
                    {
                        src: path.resolve(
                            ROOT,
                            './node_modules/lucide-static/tags.json'
                        ),
                        dest: 'assets/icons',
                        rename: '../../icon-categories.json'
                    }
                ]
            })
        ],
        build: {
            sourcemap: true,
            emptyOutDir: true,
            reportCompressedSize: true,
            cssCodeSplit: true,
            cssMinify: 'esbuild',
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
                    assetFileNames
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use 'sass:math'; @use 'sass:map';`
                }
            }
        }
    } as UserConfig
})
