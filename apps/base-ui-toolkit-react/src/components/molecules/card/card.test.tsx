import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '.'

describe('AtButton', () => {
    it('should render', async () => {
        const label = 'test button'
        const content = 'content'
        render(<Card title={label} content={content} />)
        expect(screen.getByText(label)).toBeDefined()
        expect(screen.getByText(content)).toBeDefined()
    })
})
