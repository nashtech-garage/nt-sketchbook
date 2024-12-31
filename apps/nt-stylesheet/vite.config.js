import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import path from 'path'
import tailwindcss from 'tailwindcss'
import viteSassDts from 'vite-plugin-sass-dts'

export default defineConfig({
    build: {
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
    plugins: [viteSassDts()],
})
