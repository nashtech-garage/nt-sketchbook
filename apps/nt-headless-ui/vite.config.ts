import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

import { name } from './package.json'

const packageName = name.split('/').pop()
export default defineConfig({
    resolve: {
        alias: {
            '@headless-ui': path.resolve(__dirname),
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
    },
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: packageName,
            formats: ['es', 'umd'],
            fileName: (format) => `${packageName}.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'react-dom',
                'tailwindcss',
            ],
            output: {
                dir: 'dist',
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react-dom': 'ReactDOM',
                    tailwindcss: 'tailwindcss',
                },
            },
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './setup-test.ts'),
        coverage: {
            reporter: ['cobertura', 'lcov', 'json-summary', 'json'],
            reportOnFailure: true,
            provider: 'v8',
        },
        include: [
            path.resolve(__dirname, 'components/**/*.spec.{ts,tsx}'),
        ],
        exclude: [
            'tailwind.config.ts',
            'vite.config.ts',
            '**/node_modules/**',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            'setup-test.ts',
            '**/radix/**',
            'storybook-static/**',
        ],
    },
})
