import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './setup-test.ts'),
        coverage: {
            reporter: ['cobertura', 'lcov'],
            reportOnFailure: true,
        },
    },
})
