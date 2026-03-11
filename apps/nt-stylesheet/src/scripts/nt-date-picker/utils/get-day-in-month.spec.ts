import { describe, expect, it } from 'vitest'
import { getDaysInMonth } from './get-day-in-month'

describe('getDaysInMonth', () => {
    it('returns correct number of days for normal months', () => {
        expect(getDaysInMonth(2024, 0)).toBe(31)
        expect(getDaysInMonth(2024, 1)).toBe(29)
        expect(getDaysInMonth(2023, 1)).toBe(28)
        expect(getDaysInMonth(2024, 3)).toBe(30)
        expect(getDaysInMonth(2024, 6)).toBe(31)
    })

    it('handles December correctly', () => {
        expect(getDaysInMonth(2024, 11)).toBe(31)
    })
})
