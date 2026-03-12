import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import type { ChartOptions, ChartType } from 'chart.js'
import { Chart } from './chart'
import { mockBarChartData, mockLineChartData } from './mock'

const baseOptions = {
    responsive: true,
    maintainAspectRatio: true
}

const basePlugin: Pick<ChartOptions<ChartType>, 'plugins'> = {
    plugins: {
        tooltip: {
            enabled: true,
            displayColors: true,
            backgroundColor: '#4B1F60',
            callbacks: {
                title: (items) => items[0]?.label || '',
                label: (item) => `${item.raw}`
            }
        }
    }
}

const baseClass = 'w-full h-[400px]'

const meta: Meta<typeof Chart> = {
    title: 'Components/Chart',
    component: Chart
}

export default meta

type Story = StoryObj<typeof Chart>

export const Bar: Story = {
    args: {
        type: 'bar',
        className: baseClass,
        options: {
            ...baseOptions,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    displayColors: false,
                    backgroundColor: '#4B1F60',
                    callbacks: {
                        title: () => '',
                        label: (tooltipItem) => `${tooltipItem.raw}`
                    }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1000,
                        callback: (value) =>
                            value === 0
                                ? '0'
                                : `${Number(value) / 1000}k`
                    }
                }
            }
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
                    categoryPercentage: 1
                }
            ]
        }
    }
}

export const Line: Story = {
    args: {
        type: 'line',
        className: baseClass,
        options: {
            ...baseOptions,
            ...basePlugin,
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500,

                        callback: (value) =>
                            value === 0
                                ? '0'
                                : `${Number(value) / 1000}k`
                    }
                }
            }
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
                    fill: true
                }
            ]
        }
    }
}

export const Pie: Story = {
    args: {
        type: 'pie',
        className: baseClass,
        options: {
            ...baseOptions,
            ...basePlugin
        },
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow',
                'Green',
                'Purple',
                'Orange'
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
                        '#FF9F40'
                    ]
                }
            ]
        }
    }
}
