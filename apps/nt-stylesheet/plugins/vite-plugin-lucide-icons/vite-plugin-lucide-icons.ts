import icons from 'lucide-static'
import lucideData from 'lucide-static/tags.json'
import type { Plugin } from 'vite'

const SCALE_UTILITIES = `
.nti-xs { --nti-size: 0.625rem; }  /* 10px */
.nti-sm { --nti-size: 0.75rem; }   /* 12px */
.nti-md { --nti-size: 0.875rem; }  /* 14px */
.nti-base { --nti-size: 1rem; }    /* 16px */
.nti-sl { --nti-size: 1.125rem; }  /* 18px */
.nti-lg { --nti-size: 1.25rem; }   /* 20px */
.nti-xl { --nti-size: 1.5rem; }    /* 24px */
.nti-2x { --nti-size: 1.75rem; }   /* 28px */
.nti-3x { --nti-size: 2.625rem; }  /* 42px */
`.trim()

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
    const defaultSize = options?.iconSize || 14

    return {
        name: 'vite-plugin-lucide-icons',
        apply: 'build',
        generateBundle() {
            const entries = Object.entries(icons)
            let css = `.nti{display:inline-block;width:var(--nti-size, ${defaultSize}px);height:var(--nti-size, ${defaultSize}px);background-color:currentColor;mask-size:contain;mask-repeat:no-repeat;mask-position:center;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center}`

            css += SCALE_UTILITIES

            for (const [name, svgString] of entries) {
                const kebab = resolveIconName(
                    name,
                    lucideData,
                    iconMap
                )

                const minifiedSvg = svgString
                    .replace(/>\s+</g, '><')
                    .replace(/\s+/g, ' ')
                    .replace(/width="\d+"/, 'width="100%"')
                    .replace(/height="\d+"/, 'height="100%"')
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
