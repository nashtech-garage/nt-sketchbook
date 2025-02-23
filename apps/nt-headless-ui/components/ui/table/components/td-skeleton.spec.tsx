import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TdSkeleton from './td-skeleton'

describe('TdSkeleton', () => {
    it('renders without crashing', () => {
        const { container } = render(<TdSkeleton />)
        expect(container).toBeInTheDocument()
    })

    it('renders a skeleton div with correct styles', () => {
        const { container } = render(<TdSkeleton />)
        const skeletonDiv = container.querySelector('div > div > div')

        expect(skeletonDiv).toBeInTheDocument()
        expect(skeletonDiv).toHaveClass(
            'w-full h-5 bg-gray-200 animate-pulse',
        )
    })
})
