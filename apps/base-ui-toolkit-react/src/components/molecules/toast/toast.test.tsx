import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toast } from '.'

describe('Test render toast', () => {
  it('should render empty toast type', async () => {
    render(
      <Toast
        content="hello"
        title="hey"
        onClose={() => null}
        isOpen
      />,
    )
    expect(screen.queryByTestId('toast-type')).toBeNull()
  })

  it('should render warning type', () => {
    render(
      <Toast
        content="hello"
        title="hey"
        type="warning"
        onClose={() => null}
        isOpen
      />,
    )
    expect(screen.getByTestId('toast-type')).toBeTruthy()
    expect(screen.getByTestId('warning-icon')).toBeTruthy()
  })

  it('should render fail type', () => {
    render(
      <Toast
        content="hello"
        title="hey"
        type="fail"
        onClose={() => null}
        isOpen
      />,
    )
    expect(screen.getByTestId('toast-type')).toBeTruthy()
    expect(screen.getByTestId('fail-icon')).toBeTruthy()
  })

  it('should render success type', () => {
    render(
      <Toast
        content="hello"
        title="hey"
        type="success"
        onClose={() => null}
        isOpen
      />,
    )
    expect(screen.getByTestId('toast-type')).toBeTruthy()
    expect(screen.getByTestId('success-icon')).toBeTruthy()
  })
})
