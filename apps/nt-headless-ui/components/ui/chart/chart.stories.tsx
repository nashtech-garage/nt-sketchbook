import { Meta, StoryFn } from '@storybook/react'
import { ChartType } from 'chart.js'
import React from 'react'

import { Chart, type ChartProps } from './chart'
import { mockBarChartData, mockLineChartData } from './mock'

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
            legend: {
                display: false,
            },
            tooltip: {
                xAlign: 'center',
                yAlign: 'bottom',
                position: 'average',
                enabled: true,
                displayColors: false,
                backgroundColor: '#4B1F60',
                callbacks: {
                    title: () => '',
                    label: (tooltipItem) => {
                        return `${tooltipItem.raw}`
                    },
                },
            },
        },
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000,
                    callback: (value) =>
                        value === 0
                            ? '0'
                            : `${Number(value) / 1000}k`,
                },
            },
        },
    },
    data: {
        labels: mockBarChartData.labels,
        datasets: [
            {
                label: 'Months',
                data: mockBarChartData.data,
                backgroundColor: '#D2BCD7',
                borderRadius: 25,
                hoverBackgroundColor: '#6A1F7A',
                barPercentage: 0.8,
                categoryPercentage: 1.0,
            },
        ],
    },
}
export const Line: StoryFn<ChartProps<ChartType>> = Template.bind({})
Line.args = {
    type: 'line',
    className: 'w-full h-[400px]',
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
                displayColors: true,
                backgroundColor: '#4B1F60',
                callbacks: {
                    title: (tooltipItems) =>
                        tooltipItems[0]?.label || '',
                    label: (tooltipItem) => `${tooltipItem.raw}`,
                },
            },
        },
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 500,
                    callback: (value) =>
                        value === 0
                            ? '0'
                            : `${Number(value) / 1000}k`,
                },
            },
        },
    },
    data: {
        labels: mockLineChartData.labels,
        datasets: [
            {
                label: 'Monthly Sales',
                data: mockLineChartData.data,
                borderColor: '#6A1F7A',
                backgroundColor: 'rgba(106, 31, 122, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    },
}

export const Pie: StoryFn<ChartProps<ChartType>> = Template.bind({})
Pie.args = {
    type: 'pie',
    className: 'w-full h-[400px]',
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
                displayColors: true,
                backgroundColor: '#4B1F60',
                callbacks: {
                    title: (tooltipItems) =>
                        tooltipItems[0]?.label || '',
                    label: (tooltipItem) => `${tooltipItem.raw}`,
                },
            },
        },
        maintainAspectRatio: true,
    },
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow',
            'Green',
            'Purple',
            'Orange',
        ],
        datasets: [
            {
                label: 'Dataset 1',
                data: [300, 50, 100, 75, 200, 150],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    },
}
