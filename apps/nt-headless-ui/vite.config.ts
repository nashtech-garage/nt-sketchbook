import baseConfig from '@share/vite.base.config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, mergeConfig } from 'vitest/config'

export default defineConfig(
    mergeConfig(baseConfig, {
        resolve: {
            alias: {
                '@': path.resolve(__dirname),
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
    }),
)
