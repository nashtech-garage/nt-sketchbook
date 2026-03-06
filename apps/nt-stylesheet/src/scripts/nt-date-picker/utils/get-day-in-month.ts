import { getDaysInMonth as getDaysInMonthFns } from 'date-fns'

export const getDaysInMonth = (
    year: number,
    month: number
): number => {
    return getDaysInMonthFns(new Date(year, month))
}
