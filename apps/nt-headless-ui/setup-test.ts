import '@testing-library/jest-dom'
import { vi } from 'vitest'
import 'vitest-canvas-mock'

window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
    }))

global.window.matchMedia =
    global.window.matchMedia ||
    (() => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }))

window.HTMLElement.prototype.scrollIntoView = vi.fn()
