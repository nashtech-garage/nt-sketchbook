import type { ChartData, ChartOptions, ChartType } from 'chart.js'
import { Chart as ChartJS, registerables } from 'chart.js'
import React from 'react'
import {
    Bar,
    Bubble,
    Doughnut,
    Line,
    Pie,
    PolarArea,
    Radar,
    Scatter
} from 'react-chartjs-2'

ChartJS.register(...registerables)

export type Type =
    | 'bar'
    | 'line'
    | 'scatter'
    | 'bubble'
    | 'pie'
    | 'doughnut'
    | 'polarArea'
    | 'radar'

export type ChartProps<T extends ChartType> = {
    data: ChartData<T>
    type: Type
    className?: string
    options?: ChartOptions<T>
}

export const Chart = <T extends ChartType>({
    type,
    data,
    options,
    className
}: ChartProps<T>) => {
    const ChartMap = {
        bar: Bar,
        line: Line,
        pie: Pie,
        doughnut: Doughnut,
        radar: Radar,
        polarArea: PolarArea,
        scatter: Scatter,
        bubble: Bubble
    }

    const SelectedChart = ChartMap[type] as React.ElementType

    return (
        <div className={className || 'w-full max-w-lg mx-auto'}>
            <SelectedChart data={data} options={options} />
        </div>
    )
}

export default Chart
