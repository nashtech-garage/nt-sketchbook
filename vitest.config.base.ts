import path from 'path'
import { defineConfig } from 'vitest/config'

const MIN_COVERAGE_THRESHOLD = 80

export default defineConfig({
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './setup-test.ts'),
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['json', 'cobertura', 'json-summary', 'lcov'],
            reportOnFailure: true,
            thresholds: {
                statements: MIN_COVERAGE_THRESHOLD,
                branches: MIN_COVERAGE_THRESHOLD,
                functions: MIN_COVERAGE_THRESHOLD,
                lines: MIN_COVERAGE_THRESHOLD
            }
        },

        exclude: [
            '**/vite.config.{ts,mts}',
            '**/vitest.config.{ts,mts}',
            'tailwind.config.ts',
            '**/node_modules/**',
            '**/dist/**',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            '**/radix/**',
            'storybook-static/**',
            'setup-test.ts'
        ]
    }
})
