import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from 'tailwindcss'
import viteSassDts from 'vite-plugin-sass-dts'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'themes/index.ts'),
            name: 'theme',
            fileName: 'theme',
        },
        rollupOptions: {
            external: ['tailwindcss'],
            output: {
                globals: {
                    tailwindcss: 'tailwindcss',
                },
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
