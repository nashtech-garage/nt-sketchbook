import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import path from 'path'
import tailwindcss from 'tailwindcss'
import viteSassDts from 'vite-plugin-sass-dts'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'main.ts'),
            name: 'theme',
            fileName: 'theme',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                assetFileNames: '[name].[ext]',
            },
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [viteSassDts()],
})
