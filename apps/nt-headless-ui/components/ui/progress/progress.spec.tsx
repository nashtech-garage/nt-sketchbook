import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress, type ProgressProps } from './progress'

const defaultProps: ProgressProps = {
    value: 50,
    max: 100
}

const setup = (props?: Partial<ProgressProps>) =>
    render(<Progress {...defaultProps} {...props} />)

describe('Progress Component', () => {
    it.each([
        { variant: 'default', expectClass: 'nt-progress' },
        { variant: 'danger', expectClass: 'nt-progress-danger' },
        { variant: 'warning', expectClass: 'nt-progress-warning' },
        { variant: 'success', expectClass: 'nt-progress-success' },
        { variant: 'info', expectClass: 'nt-progress-info' }
    ] as const)(
        'applies correct variant class for $variant',
        ({ variant, expectClass }) => {
            const { container } = setup({ variant })
            expect(container.firstChild).toHaveClass(expectClass)
        }
    )

    it.each([
        { size: 'sm', expectClass: 'nt-progress' },
        { size: 'md', expectClass: 'nt-progress-md' },
        { size: 'lg', expectClass: 'nt-progress-lg' },
        { size: 'xl', expectClass: 'nt-progress-xl' }
    ] as const)(
        'applies correct size class for $size',
        ({ size, expectClass }) => {
            const { container } = setup({ size })
            if (size === 'sm') {
                expect(container.firstChild).not.toHaveClass(
                    'nt-progress-md'
                )
                expect(container.firstChild).not.toHaveClass(
                    'nt-progress-lg'
                )
                expect(container.firstChild).not.toHaveClass(
                    'nt-progress-xl'
                )
            } else {
                expect(container.firstChild).toHaveClass(expectClass)
            }
        }
    )

    it.each([
        { value: 0, width: '0%' },
        { value: 25, width: '25%' },
        { value: 50, width: '50%' },
        { value: 75, width: '75%' },
        { value: 100, width: '100%' }
    ] as const)(
        'applies correct width style for value $value',
        ({ value, width }) => {
            const { container } = setup({ value })
            const bar = container.querySelector('.nt-progress-bar')
            expect(bar).toHaveStyle({ width })
        }
    )

    it('renders additional className correctly', () => {
        const { container } = setup({ className: 'my-custom-class' })
        expect(container.firstChild).toHaveClass('my-custom-class')
    })

    it('displays percent label when displayPercent is true and value < 100', () => {
        const { getByText } = setup({
            value: 75,
            displayPercent: true
        })
        expect(getByText('75%')).toBeInTheDocument()
    })

    it('displays percent label when value is 100', () => {
        const { getByText } = setup({
            value: 100,
            displayPercent: true
        })
        expect(getByText('100%')).toBeInTheDocument()
    })

    it('does not render percent label when displayPercent is false', () => {
        const { queryByText } = setup({
            value: 50,
            displayPercent: false
        })
        expect(queryByText('50%')).not.toBeInTheDocument()
    })
})
