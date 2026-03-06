import { getDay, startOfMonth } from 'date-fns'

export const getFirstDayOfMonth = (
    year: number,
    month: number
): number => {
    return getDay(startOfMonth(new Date(year, month)))
}
