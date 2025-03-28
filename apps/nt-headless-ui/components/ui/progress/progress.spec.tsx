import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from './progress'

describe('Progress Component', () => {
    const sizes = [
        {
            size: 'small',
            expectClass: 'h-3',
        },
        {
            size: 'medium',
            expectClass: 'h-4',
        },
        {
            size: 'large',
            expectClass: 'h-5',
        },
    ] as const
    const variantsWithExpectClass = [
        {
            variant: 'default',
            expectClass: 'bg-shade-secondary-1-10',
            expectIndicatorClass: 'bg-purple',
        },
        {
            variant: 'danger',
            expectClass: 'bg-danger-thin',
            expectIndicatorClass: 'bg-danger',
        },
        {
            variant: 'warning',
            expectClass: 'bg-warning-thin',
            expectIndicatorClass: 'bg-warning',
        },
        {
            variant: 'success',
            expectClass: 'bg-success-thin',
            expectIndicatorClass: 'bg-success',
        },
        {
            variant: 'info',
            expectClass: 'bg-info-thin',
            expectIndicatorClass: 'bg-info',
        },
    ] as const

    it.each(variantsWithExpectClass)(
        'renders correctly class with variant: $variant',
        ({ variant, expectClass, expectIndicatorClass }) => {
            const { container } = render(
                <Progress variant={variant} value={50} />,
            )
            expect(container.firstChild?.firstChild).toHaveClass(
                expectClass,
            )
            const indicator = container.querySelector(
                '.progress-indicator',
            )
            expect(indicator).toHaveClass(expectIndicatorClass)
        },
    )

    it.each(sizes)(
        'render correctly class with $size size',
        ({ size, expectClass }) => {
            const { container } = render(
                <Progress size={size} value={50} />,
            )
            expect(container.firstChild?.firstChild).toHaveClass(
                expectClass,
            )
        },
    )

    it('renders correctly with additional className', () => {
        render(<Progress className="additional-class" value={50} />)
        expect(
            document.getElementsByClassName('additional-class'),
        ).toHaveLength(1)
    })
    it('renders correctly with displayPercent enabled and value less than 100', () => {
        const { getByText } = render(
            <Progress value={75} displayPercent />,
        )
        const percentText = getByText('75%')
        expect(percentText).toBeInTheDocument()
    })

    it('renders correctly with displayPercent enabled and value equal to 100', () => {
        const { container, getByText } = render(
            <Progress value={100} displayPercent />,
        )
        const percentText = getByText('100%')
        expect(percentText).toBeInTheDocument()
        expect(container.firstChild).toHaveClass(
            'flex items-center justify-between',
        )
    })

    it('does not render percent text when displayPercent is disabled', () => {
        const { queryByText } = render(<Progress value={50} />)
        const percentText = queryByText('50%')
        expect(percentText).not.toBeInTheDocument()
    })
    const valuesWithExpectTransform = [
        { value: 0, width: '0%' },
        { value: 25, width: '25%' },
        { value: 50, width: '50%' },
        { value: 75, width: '75%' },
        { value: 100, width: '100%' },
    ] as const

    it.each(valuesWithExpectTransform)(
        'renders correctly with transform style based on value: $value',
        ({ value, width }) => {
            const { container } = render(<Progress value={value} />)
            const indicator = container.querySelector(
                '.progress-indicator',
            )
            expect(indicator).toHaveStyle({
                width,
            })
        },
    )
})
