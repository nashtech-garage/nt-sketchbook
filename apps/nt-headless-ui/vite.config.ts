import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { PluginOption } from 'vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(new URL(import.meta.url).pathname)
const srcDir = path.resolve(dirname, 'components/ui')

const entries = Object.fromEntries(
    fs
        .readdirSync(srcDir)
        .filter((dir) => {
            const dirPath = path.join(srcDir, dir)
            return fs.statSync(dirPath).isDirectory()
        })
        .map((dir) => [dir, path.join(srcDir, dir, 'index.ts')])
)
entries.index = path.join(srcDir, 'index.ts')

function resolveAlias(relativePath: string) {
    return path.resolve(dirname, relativePath)
}

const defaultAlias = {
    '@headless-ui': resolveAlias('./components/ui'),
    '@': resolveAlias(__dirname)
}

export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
        ),
        'process.env': process.env ?? {}
    },
    resolve: {
        alias: {
            ...defaultAlias,
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
    },
    plugins: [
        react(),
        dts({
            outDir: path.resolve(__dirname, 'dist'),
            entryRoot: path.resolve(__dirname, 'components/ui'),
            cleanVueFileName: true,
            exclude: [
                '**/*.stories.ts',
                '**/*.stories.tsx',
                '**/*.spec.ts',
                '**/*.spec.tsx',
                '**/__tests__/**',
                '**/apps/**',
                '**/storybook-static/**',
                '**/.next/**'
            ]
        }) as PluginOption
    ],
    build: {
        lib: {
            entry: entries,
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => {
                const ext = format === 'es' ? 'js' : 'cjs'
                return `${entryName}.${ext}`
            }
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
