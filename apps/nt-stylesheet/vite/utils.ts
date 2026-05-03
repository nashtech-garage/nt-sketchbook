import * as fs from 'fs'
import * as path from 'path'

export const fileExists = (p: string) => {
    try {
        fs.accessSync(p)
        return true
    } catch {
        return false
    }
}

export const stripDirs = (nameOrPath: string) =>
    path.basename(nameOrPath, path.extname(nameOrPath))

export function walkFiles(dir: string): string[] {
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
