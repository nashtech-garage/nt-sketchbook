import * as fs from 'fs'
import * as path from 'path'
import type { Plugin } from 'vite'
import { OUT_DIR, ROOT } from './paths'
import { fileExists, stripDirs } from './utils'

export type EntryMap = Record<string, string>

export function makeInputs(): EntryMap {
    const entries: EntryMap = {
        nt: path.resolve(ROOT, 'src/styles/_site.scss'),
        'scripts/index': path.resolve(ROOT, 'src/scripts/index.ts'),
        tailwindIntegrations: path.resolve(
            ROOT,
            'src/integrations/tailwind/index.ts'
        )
    }

    for (const file of getThemeFiles()) {
        entries[stripDirs(file)] = path.resolve(
            ROOT,
            'src/styles/themes',
            file
        )
    }

    for (const file of getBrandFiles()) {
        entries[`brands/${stripDirs(file)}`] = path.resolve(
            ROOT,
            'src/styles/brands',
            file
        )
    }

    return entries
}

export function themeManifestPlugin(inputs: EntryMap): Plugin {
    return {
        name: 'nt-theme-manifest',
        apply: 'build',
        writeBundle() {
            const themes = Object.keys(inputs).filter((key) =>
                key.startsWith('nt-theme-')
            )
            const manifestPath = path.resolve(
                OUT_DIR,
                'theme-manifest.json'
            )

            fs.mkdirSync(OUT_DIR, { recursive: true })
            fs.writeFileSync(
                manifestPath,
                JSON.stringify(themes, null, 2)
            )
        }
    }
}

function getThemeFiles() {
    const themesDir = path.resolve(ROOT, 'src/styles/themes')
    if (!fileExists(themesDir)) return []

    return fs.readdirSync(themesDir).filter((file) => {
        const fullPath = path.join(themesDir, file)
        return (
            file.startsWith('nt-theme-') &&
            file.endsWith('.scss') &&
            fs.statSync(fullPath).isFile()
        )
    })
}

function getBrandFiles() {
    const brandsDir = path.resolve(ROOT, 'src/styles/brands')
    if (!fileExists(brandsDir)) return []

    return fs.readdirSync(brandsDir).filter((file) => {
        const fullPath = path.join(brandsDir, file)
        return (
            !file.startsWith('_') &&
            file.endsWith('.scss') &&
            fs.statSync(fullPath).isFile()
        )
    })
}
