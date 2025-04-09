import { render } from '@testing-library/react'
import type { ChartData } from 'chart.js'
import { describe, expect, it } from 'vitest'

import { Chart } from './chart'

const mockBarChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Sales',
            data: [500, 1000, 1500, 2000, 2500],
            backgroundColor: '#D2BCD7',
        },
    ],
}

const mockLineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Revenue',
            data: [300, 500, 800, 1200, 1600],
            borderColor: '#6A1F7A',
            backgroundColor: 'rgba(106, 31, 122, 0.2)',
            tension: 0.4,
        },
    ],
}

const mockBubbleChartData: ChartData<'bubble'> = {
    datasets: [
        {
            label: 'Bubbles',
            data: [
                { x: 10, y: 20, r: 15 },
                { x: 15, y: 10, r: 10 },
                { x: 20, y: 30, r: 20 },
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
}

export const mockPieChartData: ChartData<'pie'> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            data: [30, 50, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
    ],
}

const mockDoughnutChartData: ChartData<'doughnut'> = {
    labels: ['Apple', 'Banana', 'Cherry'],
    datasets: [
        {
            data: [40, 35, 25],
            backgroundColor: ['#FF9999', '#FFCC99', '#99CCFF'],
        },
    ],
}

const mockRadarChartData: ChartData<'radar'> = {
    labels: ['Running', 'Swimming', 'Cycling'],
    datasets: [
        {
            label: 'Athlete Performance',
            data: [65, 75, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
        },
    ],
}

const mockPolarAreaChartData: ChartData<'polarArea'> = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
        {
            data: [10, 20, 30],
            backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
        },
    ],
}

const mockScatterChartData: ChartData<'scatter'> = {
    datasets: [
        {
            label: 'Scatter Dataset',
            data: [
                { x: -10, y: 0 },
                { x: 0, y: 10 },
                { x: 10, y: 5 },
            ],
            backgroundColor: '#4B1F60',
        },
    ],
}

describe('Chart Component', () => {
    it('renders a bar chart without crashing', () => {
        const { container } = render(
            <Chart
                type="bar"
                data={mockBarChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a line chart without crashing', () => {
        const { container } = render(
            <Chart
                type="line"
                data={mockLineChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a bubble chart without crashing', () => {
        const { container } = render(
            <Chart
                type="bubble"
                data={mockBubbleChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a pie chart without crashing', () => {
        const { container } = render(
            <Chart
                type="pie"
                data={mockPieChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a doughnut chart without crashing', () => {
        const { container } = render(
            <Chart
                type="doughnut"
                data={mockDoughnutChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a radar chart without crashing', () => {
        const { container } = render(
            <Chart
                type="radar"
                data={mockRadarChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a polar area chart without crashing', () => {
        const { container } = render(
            <Chart
                type="polarArea"
                data={mockPolarAreaChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('renders a scatter chart without crashing', () => {
        const { container } = render(
            <Chart
                type="scatter"
                data={mockScatterChartData}
                className="test-class"
            />,
        )
        expect(container).toBeInTheDocument()
    })

    it('applies the provided className', () => {
        const { container } = render(
            <Chart
                type="bar"
                data={mockBarChartData}
                className="custom-class"
            />,
        )
        expect(container.firstChild).toHaveClass('custom-class')
    })
})
