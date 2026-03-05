import { describe, expect, it } from 'vitest'
import { getFirstDayOfMonth } from './get-first-day-of-month'

describe('getFirstDayOfMonth', () => {
    it('returns correct weekday index for first day of the month', () => {
        expect(getFirstDayOfMonth(2024, 0)).toBe(1)

        expect(getFirstDayOfMonth(2024, 1)).toBe(4)

        expect(getFirstDayOfMonth(2024, 2)).toBe(5)

        expect(getFirstDayOfMonth(2024, 3)).toBe(1)

        expect(getFirstDayOfMonth(2024, 4)).toBe(3)
    })

    it('handles December correctly', () => {
        expect(getFirstDayOfMonth(2024, 11)).toBe(0)
    })
})
