import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
            '@stylesheet': path.resolve(
                __dirname,
                '../nt-stylesheet',
            ),
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
    },
    plugins: [react()],
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './setup-test.ts'),
        coverage: {
            reporter: ['cobertura', 'lcov'],
            reportOnFailure: true,
        },
    },
})
