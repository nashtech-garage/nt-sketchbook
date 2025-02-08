import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            '@headless-ui': path.resolve(__dirname),
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
            reporter: ['cobertura', 'lcov', 'json-summary', 'json'],
            reportOnFailure: true,
        },
        exclude: [
            'tailwind.config.ts',
            'vite.config.ts',
            '**/node_modules/**',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            'setup-test.ts',
        ],
    },
})
