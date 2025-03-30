import { Meta, StoryFn } from '@storybook/react'
import { ChartType } from 'chart.js'
import React from 'react'

import { Chart, type ChartProps } from './chart'

export default {
    title: 'Components/Chart',

    component: Chart,
} as Meta

const Template: StoryFn<ChartProps<ChartType>> = (
    args: ChartProps<any>,
) => <Chart {...args} />

export const Bar: StoryFn<ChartProps<ChartType>> = Template.bind({})
Bar.args = {
    type: 'bar',
    className: 'w-full h-[400px]',
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        maintainAspectRatio: true,
    },
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    },
}
