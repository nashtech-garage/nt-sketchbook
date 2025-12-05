import '@testing-library/jest-dom'
import { vi } from 'vitest'
import 'vitest-canvas-mock'

class ResizeObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

class IntersectionObserverMock {
    constructor() {}
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

global.window.matchMedia =
    global.window.matchMedia ||
    (() => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))

window.HTMLElement.prototype.scrollIntoView = vi.fn()
