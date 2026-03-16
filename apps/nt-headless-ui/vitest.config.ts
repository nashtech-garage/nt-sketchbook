import react from '@vitejs/plugin-react'
import path from 'path'
import { mergeConfig } from 'vitest/config'
import baseVitestConfig from '../../vitest.config.base'

export default mergeConfig(baseVitestConfig, {
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname)
        }
    },
    test: {
        include: ['**/*.spec.ts']
    }
})
