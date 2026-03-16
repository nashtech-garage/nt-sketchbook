import { mergeConfig } from 'vitest/config'
import baseVitestConfig from '../../vitest.config.base'

export default mergeConfig(baseVitestConfig, {
    test: {
        include: ['**/*.spec.ts']
    }
})
