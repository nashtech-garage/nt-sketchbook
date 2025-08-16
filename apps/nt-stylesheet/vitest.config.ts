import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        watch: false,
        environment: 'jsdom',
        globals: true,
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['json', 'cobertura', 'json-summary', 'lcov'],
            reportOnFailure: true
        },
        exclude: [
            '**/vite.config.{ts,mts}',
            '**/vitest.config.{ts,mts}',
            'tailwind.config.ts',
            '**/node_modules/**',
            '**/dist/**'
        ]
    }
})
