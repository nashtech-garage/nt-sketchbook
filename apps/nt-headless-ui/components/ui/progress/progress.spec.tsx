import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from './progress'

describe('Progress Component', () => {
    const sizes = [
        {
            size: 'small',
            expectClass: 'h-1',
        },
        {
            size: 'medium',
            expectClass: 'h-2',
        },
        {
            size: 'large',
            expectClass: 'h-3',
        },
    ] as const
    const variantsWithExpectClass = [
        {
            variant: 'default',
            expectClass: 'bg-secondary-6',
            expectIndicatorClass: 'bg-black',
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
            expect(container.firstChild).toHaveClass(expectClass)
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
            expect(container.firstChild).toHaveClass(expectClass)
        },
    )

    it('renders correctly with additional className', () => {
        const { container } = render(
            <Progress className="additional-class" value={50} />,
        )
        expect(container.firstChild).toHaveClass('additional-class')
    })

    const valuesWithExpectTransform = [
        { value: 0, expectTransform: 'translateX(-100%)' },
        { value: 25, expectTransform: 'translateX(-75%)' },
        { value: 50, expectTransform: 'translateX(-50%)' },
        { value: 75, expectTransform: 'translateX(-25%)' },
        { value: 100, expectTransform: 'translateX(-0%)' },
    ] as const

    it.each(valuesWithExpectTransform)(
        'renders correctly with transform style based on value: $value',
        ({ value, expectTransform }) => {
            const { container } = render(<Progress value={value} />)
            const indicator = container.querySelector(
                '.progress-indicator',
            )
            expect(indicator).toHaveStyle({
                transform: expectTransform,
            })
        },
    )
})
