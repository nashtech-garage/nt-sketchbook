import * as path from 'path'
import type { PreRenderedAsset } from 'rollup'
import { stripDirs } from './utils'

export function assetFileNames(assetInfo: PreRenderedAsset): string {
    const name = assetInfo.name ?? ''
    const originalFiles: string[] = assetInfo.originalFileNames ?? []
    const basename = stripDirs(name)
    const ext = path.extname(name)

    if (
        name.endsWith('.css') &&
        originalFiles.some((file) =>
            file.includes('src/integrations/tailwind/index.ts')
        )
    ) {
        return 'integrations/tailwind/style.css'
    }

    if (name.includes('nt-theme') && ext === '.css') {
        return `themes/${basename}${ext}`
    }

    if (
        ext === '.css' &&
        (name.includes('brands') ||
            originalFiles.some((file) =>
                file.includes('src/styles/brands')
            ))
    ) {
        return `brands/${basename}${ext}`
    }

    if (basename === 'nt-icons' && ext === '.css') {
        return `css/nt-icons.css`
    }

    if (ext === '.css') {
        return `css/${basename}${ext}`
    }

    return `assets/${basename}${ext}`
}
