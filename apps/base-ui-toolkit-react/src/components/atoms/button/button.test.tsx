import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '.'

describe('Button', () => {
  it('should render', async () => {
    const label = 'test button'
    render(<Button label={label} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
