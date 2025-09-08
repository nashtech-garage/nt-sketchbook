import * as fs from 'fs'
import * as path from 'path'
import type { PreRenderedAsset } from 'rollup'

export const ROOT = __dirname
export const OUT_DIR = path.resolve(ROOT, 'dist')

export const COPY_404 =
    (process.env.VITE_COPY_404 ?? 'true') !== 'false'

export type EntryMap = Record<string, string>

const fileExists = (p: string) => {
    try {
        fs.accessSync(p)
        return true
    } catch {
        return false
    }
}

const stripDirs = (nameOrPath: string) =>
    path.basename(nameOrPath, path.extname(nameOrPath))

/** Build inputs programmatically */
export function makeInputs(): EntryMap {
    const entries: EntryMap = {
        'nt-icons': path.resolve(ROOT, 'src/styles/_icons.scss'),
        nt: path.resolve(ROOT, 'src/styles/_site.scss'),
        'scripts/index': path.resolve(ROOT, 'src/scripts/index.ts'),
        tailwindIntegrations: path.resolve(
            ROOT,
            'src/integrations/tailwind/index.ts'
        )
    }

    // Register themes by directory
    const themesDir = path.resolve(ROOT, 'src/themes')
    if (fileExists(themesDir)) {
        const themeFolders = fs.readdirSync(themesDir).filter((d) => {
            const full = path.join(themesDir, d)
            return (
                d.startsWith('nt-theme-') &&
                fs.statSync(full).isDirectory()
            )
        })

        for (const folder of themeFolders) {
            const entry = path.resolve(
                themesDir,
                folder,
                '_index.scss'
            )
            if (fileExists(entry)) {
                entries[folder] = entry
            }
        }
    }

    // Register brands by directory
    const brandingDir = path.resolve(ROOT, 'src/branding')
    if (fileExists(brandingDir)) {
        const brandFolders = fs
            .readdirSync(brandingDir)
            .filter((d) => {
                const full = path.join(brandingDir, d)
                return fs.statSync(full).isDirectory()
            })

        for (const folder of brandFolders) {
            const entry = path.resolve(
                brandingDir,
                folder,
                '_index.scss'
            )
            if (fileExists(entry)) {
                entries[`branding/${folder}`] = entry
            }
        }
    }

    // Write theme manifest
    const themes = Object.keys(entries).filter((k) =>
        k.startsWith('nt-theme-')
    )
    const manifestPath = path.resolve(OUT_DIR, 'theme-manifest.json')
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(manifestPath, JSON.stringify(themes, null, 2))

    return entries
}

/** Asset naming rules */
export function assetFileNames(assetInfo: PreRenderedAsset): string {
    const name = assetInfo.name ?? ''
    const originalFiles: string[] = assetInfo.originalFileNames ?? []
    const basename = stripDirs(name)
    const ext = path.extname(name)

    // Tailwind integration CSS
    if (
        name.endsWith('.css') &&
        originalFiles.some((of) =>
            of.includes('src/integrations/tailwind/index.ts')
        )
    ) {
        return 'integrations/tailwind/style.css'
    }

    // Themes: nt-theme-X/_index.scss -> themes/nt-theme-X.css
    if (name.includes('nt-theme') && ext === '.css') {
        return `themes/${basename}${ext}`
    }

    // Branding: branding/X/_index.scss -> branding/X.css
    if (name.includes('branding') && ext === '.css') {
        return `branding/${basename}${ext}`
    }

    // Icons
    if (basename === 'nt-icons' && ext === '.css') {
        return `css/nt-icons.css`
    }

    // General CSS
    if (ext === '.css') {
        return `css/${basename}${ext}`
    }

    // Fallback
    return `assets/${basename}${ext}`
}

/** Controlled asset copy list */
export function assetCopies() {
    const copies = [
        { input: './docs', output: 'docs', glob: '*.md' },
        {
            input: './src/fonts',
            output: 'assets/fonts',
            glob: '**/*'
        },
        { input: './examples', output: 'examples', glob: '**/*' },
        { input: '.', output: '', glob: 'components-manifest.json' },
        { input: '.', output: '', glob: 'index.html' }
    ] as { input: string; output: string; glob: string }[]

    if (COPY_404) {
        copies.push({ input: '.', output: '', glob: '404.html' })
    }

    return copies
}
