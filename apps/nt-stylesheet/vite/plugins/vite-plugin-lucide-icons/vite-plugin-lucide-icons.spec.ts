import { describe, expect, it, vi } from 'vitest'
import {
    generateIconCss,
    resolveIconName
} from './vite-plugin-lucide-icons'

const mockLucideData = {
    'clock-10': ['time'],
    'arrow-down-0-1': ['sort'],
    'move-3d': ['axis']
}

const mockIconMap = {
    Clock10: 'clock-10',
    ArrowDown01: 'arrow-down-0-1',
    Move3d: 'move-3d'
}

describe('resolveIconName', () => {
    it('should keep correct naming for Clocks (no extra dash)', () => {
        expect(
            resolveIconName('Clock10', mockLucideData, mockIconMap)
        ).toBe('clock-10')
    })

    it('should handle sorting icons with multiple dashes', () => {
        expect(
            resolveIconName(
                'ArrowDown01',
                mockLucideData,
                mockIconMap
            )
        ).toBe('arrow-down-0-1')
    })

    it('should fallback to kebab-case for unknown icons', () => {
        expect(resolveIconName('UserPlus', {}, {})).toBe('user-plus')
    })
})

describe('lucideIconsPlugin', () => {
    it('emits a CSS file during the build', () => {
        const plugin = generateIconCss({ output: 'test.css' })

        const context = {
            emitFile: vi.fn()
        }

        if (typeof plugin.generateBundle === 'function') {
            plugin.generateBundle.call(
                context as any,
                {} as any,
                {} as any,
                false
            )
        }

        expect(context.emitFile).toHaveBeenCalledWith(
            expect.objectContaining({
                fileName: 'test.css',
                type: 'asset'
            })
        )

        const callArgs = context.emitFile.mock.calls[0][0]
        expect(callArgs.source).toContain('.nti{display:inline-block')
        expect(callArgs.source).toContain(
            '.nti-clock-10{mask-image:url("data:image/svg+xml;base64'
        )
    })
})
