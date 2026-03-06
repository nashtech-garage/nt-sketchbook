export type DayClassOptions = {
    dayIndex: string
    isSelectedDate: boolean
    isToday: boolean
    isWeekend: boolean
    isOutsideMonth?: boolean
}

export type CellOptions = {
    date: Date
    day: number
    outsideMonth: -1 | 0 | 1
    isToday?: boolean
}
