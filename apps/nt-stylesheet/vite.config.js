import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import viteSassDts from 'vite-plugin-sass-dts'
import path from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'themes/index.ts'),
            name: 'ntStylesheetThemes',
            fileName: (format) => `themes.${format}.js`,
        },
        outDir: 'dist',
        cssCodeSplit: false,
        rollupOptions: {
            input: path.resolve(__dirname, 'src/styles.scss'),
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
