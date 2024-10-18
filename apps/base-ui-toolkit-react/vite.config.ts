import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'url'
import { name } from './package.json'
import VitePluginReactRemoveAttributes from 'vite-plugin-react-remove-attributes'
import path from 'path'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    publicDir: 'public',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@sdk': fileURLToPath(new URL('./src/sdk', import.meta.url)),
        '@sdk-type-global': fileURLToPath(
          new URL('./src/sdk/types/index.ts', import.meta.url),
        ),
        '@public': fileURLToPath(
          new URL('./public', import.meta.url),
        ),
      },
    },
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
      VitePluginReactRemoveAttributes({
        attributes: ['data-testid'],
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name,
        formats: ['es', 'umd'],
        fileName: (format) => `${name}.${format}.js`,
      },
      rollupOptions: {
        external: [
          'react',
          'react/jsx-runtime',
          'react-dom',
          'tailwindcss',
        ],
        output: {
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
      testTimeout: 10000,
      timers: 'modern',
      globals: true,
      environment: 'jsdom',
      reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': './coverage/sonar-report.xml',
      },
      coverage: {
        reporter: ['cobertura', 'lcov'],
        reportOnFailure: true,
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
