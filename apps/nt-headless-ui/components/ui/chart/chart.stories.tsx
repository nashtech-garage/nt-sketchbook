import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { Chart, type ChartProps } from './chart'

export default {
    title: 'Components/Chart',

    component: Chart,
} as Meta

const Template: StoryFn<ChartProps<any>> = (
    args: ChartProps<any>,
) => <Chart {...args} />

export const Bar: StoryFn<ChartProps<any>> = Template.bind({})
Bar.args = {
    type: 'bar',
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
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
