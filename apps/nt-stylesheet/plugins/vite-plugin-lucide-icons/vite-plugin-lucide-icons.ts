import icons from 'lucide-static'
import lucideData from 'lucide-static/tags.json'
import type { Plugin } from 'vite'

const iconMap: Record<string, string> = Object.keys(
    lucideData
).reduce(
    (acc, key) => {
        const pascalName =
            key.charAt(0).toUpperCase() +
            key
                .slice(1)
                .replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
        acc[pascalName] = key
        return acc
    },
    {} as Record<string, string>
)

export function resolveIconName(
    name: string,
    lucideData: Record<string, unknown>,
    iconMap: Record<string, string>
): string {
    if (name in lucideData) return name
    if (iconMap[name]) return iconMap[name]
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/-+/g, '-')
}

export function generateIconCss(options?: {
    iconSize?: number
    output?: string
}): Plugin {
    const outputFile = options?.output || 'assets/nt-icons.css'
    const size = options?.iconSize || 14

    return {
        name: 'vite-plugin-lucide-icons',
        apply: 'build',
        generateBundle() {
            const entries = Object.entries(icons)
            let css = `.nti{display:inline-block;width:${size}px;height:${size}px;background-color:currentColor;mask-size:contain;mask-repeat:no-repeat;mask-position:center;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center}`

            for (const [name, svgString] of entries) {
                const kebab = resolveIconName(
                    name,
                    lucideData,
                    iconMap
                )

                const minifiedSvg = svgString
                    .replace(/>\s+</g, '><')
                    .replace(/\s+/g, ' ')
                    .replace(/width="\d+"/, `width="${size}"`)
                    .replace(/height="\d+"/, `height="${size}"`)
                    .trim()

                const b64 =
                    Buffer.from(minifiedSvg).toString('base64')
                const uri = `data:image/svg+xml;base64,${b64}`

                css += `.nti-${kebab}{mask-image:url("${uri}");-webkit-mask-image:url("${uri}")}`
            }

            this.emitFile({
                type: 'asset',
                fileName: outputFile,
                source: css
            })
        }
    }
}
