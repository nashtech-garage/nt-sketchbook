import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TdSkeleton from './td-skeleton'

const setup = () => render(<TdSkeleton />)

describe('TdSkeleton', () => {
    it('renders the skeleton with correct classes', () => {
        const { container } = setup()

        const wrapper = container.querySelector('.nt-table-loading')
        const loadingBar = container.querySelector(
            '.nt-table-loading-bar'
        )

        expect(wrapper).toBeInTheDocument()
        expect(loadingBar).toBeInTheDocument()
    })
})
