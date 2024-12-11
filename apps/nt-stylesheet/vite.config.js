import tailwindcss, { postcss } from 'tailwindcss'

import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import path from 'path'
import viteSassDts from 'vite-plugin-sass-dts'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'main.ts'),
            name: 'theme',
            fileName: 'theme',
        },
        rollupOptions: {
            output: {
                assetFileNames: '[name].[ext]',
            },
        },
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    config: path.resolve(
                        __dirname,
                        'tailwind.config.js',
                    ),
                }),
                autoprefixer(),
            ],
        },
    },
    plugins: [
        viteSassDts(),
        postcss({
            extract: true,
            minimize: true,
            plugins: [
                tailwindcss({
                    config: path.resolve(
                        __dirname,
                        'tailwind.config.js',
                    ),
                }),
                autoprefixer(),
            ],
            use: ['sass'],
        }),
    ],
})
