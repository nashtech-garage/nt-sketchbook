import * as fs from 'fs'
import * as path from 'path'
import type { Plugin } from 'vite'
import { OUT_DIR, ROOT } from './paths'
import { walkFiles } from './utils'

const PREVIEW_DIR = path.resolve(ROOT, 'preview')
const STYLE_SECTION_DIR = path.resolve(
    PREVIEW_DIR,
    'docs/styles/sections'
)
const STYLE_SECTIONS = [
    'hero',
    'usage',
    'colors',
    'border',
    'animation',
    'flex',
    'grid',
    'size',
    'spacing',
    'text',
    'typography',
    'utilities',
    'sass',
    'footer'
]
const CLEAN_ROUTES: Record<string, string> = {
    styles: 'docs/styles.html',
    components: 'docs/components.html',
    example: 'docs/components.html',
    icons: 'docs/icons.html'
}
const HTML_PLACEHOLDERS: Record<string, string> = {
    __NT_CSS__: 'css/nt.css',
    __NT_THEME_LIGHT_CSS__: 'themes/nt-theme-light.css',
    __NT_BRAND_CSS__: 'brands/nashtech.css',
    __NT_ICONS_CSS__: 'css/nt-icons.css',
    __NT_SCRIPT__: 'scripts/nt.js'
}

export function previewPlugin(): Plugin {
    return {
        name: 'nt-preview',
        apply: 'build',
        closeBundle() {
            for (const sourceFile of walkFiles(PREVIEW_DIR)) {
                writePreviewFile(sourceFile)
            }
            writeCleanRouteFiles()
        }
    }
}

function writePreviewFile(sourceFile: string) {
    const relativeFile = path.relative(PREVIEW_DIR, sourceFile)
    const outputFile = path.resolve(OUT_DIR, relativeFile)

    fs.mkdirSync(path.dirname(outputFile), { recursive: true })

    if (path.extname(sourceFile) === '.html') {
        fs.writeFileSync(
            outputFile,
            resolvePreviewHtml(
                fs.readFileSync(sourceFile, 'utf8'),
                outputFile
            )
        )
        return
    }

    fs.copyFileSync(sourceFile, outputFile)
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
        /__DOCS_ASSET:([A-Za-z0-9._/-]+?)__/g,
        (_match, assetPath: string) =>
            toRelativeAsset(outputFile, `assets/${assetPath}`)
    )

    nextContent = nextContent.replaceAll(
        '__STYLE_SECTIONS__',
        readStyleSections()
    )

    if (
        /__(?:NT_[A-Z_]+|DOCS_ASSET:[^_]+|STYLE_SECTIONS)__/.test(
            nextContent
        )
    ) {
        throw new Error(
            `Unresolved preview asset placeholder in ${outputFile}`
        )
    }

    return nextContent
}

function toRelativeAsset(fromFile: string, assetPath: string) {
    const fromDir = path.dirname(fromFile)
    const target = path.resolve(OUT_DIR, assetPath)
    return path.relative(fromDir, target).replaceAll(path.sep, '/')
}

function readStyleSections() {
    return STYLE_SECTIONS.map((section) =>
        fs.readFileSync(
            path.resolve(STYLE_SECTION_DIR, `${section}.html`),
            'utf8'
        )
    ).join('\n')
}

function writeCleanRouteFiles() {
    for (const [route, target] of Object.entries(CLEAN_ROUTES)) {
        const routeDir = path.resolve(OUT_DIR, route)

        fs.mkdirSync(routeDir, { recursive: true })
        fs.writeFileSync(
            path.resolve(routeDir, 'index.html'),
            makeRedirectPage(`../${target}`)
        )
        fs.writeFileSync(
            path.resolve(OUT_DIR, `${route}.html`),
            makeRedirectPage(target)
        )
    }
}

function makeRedirectPage(target: string) {
    return `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Redirecting - NT Stylesheet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
        <script>
            const target = new URL('${target}', window.location.href)
            target.search = window.location.search
            target.hash = window.location.hash
            window.location.replace(target)
        </script>
        <p>
            Redirecting to <a href="${target}">${target}</a>.
        </p>
    </body>
</html>
`
}
