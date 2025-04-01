import {
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    ChartType,
    registerables,
} from 'chart.js'
import React from 'react'
import {
    Bar,
    Bubble,
    Doughnut,
    Line,
    Pie,
    PolarArea,
    Radar,
    Scatter,
} from 'react-chartjs-2'

ChartJS.register(...registerables)

type Type =
    | 'bar'
    | 'line'
    | 'scatter'
    | 'bubble'
    | 'pie'
    | 'doughnut'
    | 'polarArea'
    | 'radar'

export type ChartProps<T extends ChartType> = {
    type: Type
    data: ChartData<T>
    options?: ChartOptions<T>
    className?: string
}

export const Chart = <T extends ChartType>({
    type,
    data,
    options,
    className,
}: ChartProps<T>) => {
    const ChartMap = {
        bar: Bar,
        line: Line,
        pie: Pie,
        doughnut: Doughnut,
        radar: Radar,
        polarArea: PolarArea,
        scatter: Scatter,
        bubble: Bubble,
    }

    const SelectedChart = ChartMap[type] as React.ElementType

    return (
        <div className={className || 'w-full max-w-lg mx-auto'}>
            <SelectedChart data={data} options={options} />
        </div>
    )
}
