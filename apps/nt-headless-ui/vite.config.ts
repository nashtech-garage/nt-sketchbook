import react from '@vitejs/plugin-react'
import path from 'path'
import { PluginOption } from 'vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

const packageName = 'headless-ui'
export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
        ),
        'process.env': process.env ?? {}
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
    },
    plugins: [
        react(),
        dts({
            outDir: path.resolve(__dirname, 'dist'),
            entryRoot: path.resolve(__dirname, './'),
            cleanVueFileName: true
        }) as PluginOption
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: packageName,
            formats: ['es', 'umd'],
            fileName: (format) => `${packageName}.${format}.js`
        },
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            external: [
                'react',
                'react/jsx-runtime',
                'react-dom',
                'tailwindcss'
            ],
            output: {
                dir: path.resolve(__dirname, 'dist'),
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react-dom': 'ReactDOM',
                    tailwindcss: 'tailwindcss'
                }
            }
        }
    },
    test: {
        watch: false,
        deps: {
            inline: ['vitest-canvas-mock']
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './setup-test.ts'),
        coverage: {
            reporter: ['cobertura', 'lcov', 'json-summary', 'json'],
            reportOnFailure: true,
            provider: 'v8'
        },
        include: [
            path.resolve(__dirname, 'components/**/*.spec.{ts,tsx}')
        ],
        exclude: [
            'tailwind.config.ts',
            'vite.config.ts',
            '**/node_modules/**',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            'setup-test.ts',
            '**/radix/**',
            'storybook-static/**'
        ]
    }
})
