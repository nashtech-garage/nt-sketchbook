import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import viteSassDts from 'vite-plugin-sass-dts'

export default defineConfig({
    build: {
        outDir: 'dist',
        cssCodeSplit: false,
        rollupOptions: {
            input: './src/styles.scss',
            output: {
                entryFileNames: 'styles.css',
                chunkFileNames: 'styles.css',
                assetFileNames: '[name].[ext]',
            },
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()],
        },
    },
    plugins: [viteSassDts()],
})
