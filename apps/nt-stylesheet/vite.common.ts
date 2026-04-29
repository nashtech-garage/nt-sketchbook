import * as fs from 'fs'
import * as path from 'path'
import type { PreRenderedAsset } from 'rollup'
import type { Plugin } from 'vite'

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
        nt: path.resolve(ROOT, 'src/styles/_site.scss'),
        'scripts/index': path.resolve(ROOT, 'src/scripts/index.ts'),
        tailwindIntegrations: path.resolve(
            ROOT,
            'src/integrations/tailwind/index.ts'
        )
    }

    // Register themes by canonical style entry file
    const themesDir = path.resolve(ROOT, 'src/styles/themes')
    if (fileExists(themesDir)) {
        const themeFiles = fs.readdirSync(themesDir).filter((d) => {
            const full = path.join(themesDir, d)
            return (
                d.startsWith('nt-theme-') &&
                d.endsWith('.scss') &&
                fs.statSync(full).isFile()
            )
        })

        for (const file of themeFiles) {
            const entry = path.resolve(themesDir, file)
            if (fileExists(entry)) {
                entries[stripDirs(file)] = entry
            }
        }
    }

    // Register brands by canonical style entry file
    const brandsDir = path.resolve(ROOT, 'src/styles/brands')
    if (fileExists(brandsDir)) {
        const brandFiles = fs.readdirSync(brandsDir).filter((d) => {
            const full = path.join(brandsDir, d)
            return (
                !d.startsWith('_') &&
                d.endsWith('.scss') &&
                fs.statSync(full).isFile()
            )
        })

        for (const file of brandFiles) {
            const entry = path.resolve(brandsDir, file)
            if (fileExists(entry)) {
                entries[`brands/${stripDirs(file)}`] = entry
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

    // Brands: brands/X.scss -> brands/X.css
    if (
        ext === '.css' &&
        (name.includes('brands') ||
            originalFiles.some((of) =>
                of.includes('src/styles/brands')
            ))
    ) {
        return `brands/${basename}${ext}`
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
        { input: './docs', output: 'docs', glob: '**/*' },
        {
            input: './src/fonts',
            output: 'assets/fonts',
            glob: '**/*'
        },
        { input: '.', output: '', glob: 'components-manifest.json' }
    ] as { glob: string; input: string; output: string }[]

    if (COPY_404) {
        copies.push({ input: '.', output: '', glob: '404.html' })
    }

    return copies
}

const PREVIEW_DIR = path.resolve(ROOT, 'preview')
const HTML_PLACEHOLDERS: Record<string, string> = {
    __NT_CSS__: 'css/nt.css',
    __NT_THEME_LIGHT_CSS__: 'themes/nt-theme-light.css',
    __NT_BRAND_CSS__: 'brands/nashtech.css',
    __NT_ICONS_CSS__: 'css/nt-icons.css',
    __NT_SCRIPT__: 'scripts/nt.js'
}

function walkFiles(dir: string): string[] {
    if (!fileExists(dir)) return []

    return fs

        .readdirSync(dir, { withFileTypes: true })
        .flatMap((entry) => {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) return walkFiles(fullPath)
            if (entry.isFile()) return [fullPath]
            return []
        })
}

function toRelativeAsset(fromFile: string, assetPath: string) {
    const fromDir = path.dirname(fromFile)

    const target = path.resolve(OUT_DIR, assetPath)
    const relative = path
        .relative(fromDir, target)
        .replaceAll(path.sep, '/')

    return relative
}

function resolvePreviewHtml(content: string, outputFile: string) {
    let nextContent = content

    for (const [token, assetPath] of Object.entries(
        HTML_PLACEHOLDERS
    )) {
        nextContent = nextContent.replaceAll(
            token,
            toRelativeAsset(outputFile, assetPath)
        )
    }

    nextContent = nextContent.replace(
        /__PREVIEW_ASSET:([A-Za-z0-9._/-]+?)__/g,
        (_match, assetPath: string) =>
            toRelativeAsset(outputFile, `assets/${assetPath}`)
    )

    if (/__(?:NT_[A-Z_]+|PREVIEW_ASSET:[^_]+)__/.test(nextContent)) {
        throw new Error(
            `Unresolved preview asset placeholder in ${outputFile}`
        )
    }

    return nextContent
}

export function previewSitePlugin(): Plugin {
    return {
        name: 'nt-preview-site',
        apply: 'build',

        closeBundle() {
            for (const sourceFile of walkFiles(PREVIEW_DIR)) {
                const relativeFile = path.relative(
                    PREVIEW_DIR,
                    sourceFile
                )
                const outputFile = path.resolve(OUT_DIR, relativeFile)

                fs.mkdirSync(path.dirname(outputFile), {
                    recursive: true
                })

                if (path.extname(sourceFile) === '.html') {
                    fs.writeFileSync(
                        outputFile,
                        resolvePreviewHtml(
                            fs.readFileSync(sourceFile, 'utf8'),
                            outputFile
                        )
                    )
                    continue
                }

                fs.copyFileSync(sourceFile, outputFile)
            }
        }
    }
}
