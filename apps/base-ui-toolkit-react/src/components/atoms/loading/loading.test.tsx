import { render } from '@testing-library/react'

import { Loading, Size } from '.'

describe('Test loading component', () => {
  const renderLoading = (size?: Size, className?: string) =>
    render(<Loading size={size} className={className} />)

  test('renders correctly with default size', () => {
    const { container } = renderLoading()
    const svgElement = container.querySelector('svg')

    expect(svgElement).toBeTruthy()
    expect(svgElement?.classList.value).toContain('w-10 h-10')
  })

  test('renders correctly with size "sm"', () => {
    const { container } = renderLoading()
    const svgElement = container.querySelector('svg')

    expect(svgElement?.classList.value).toContain('w-10 h-10')
  })

  test('renders correctly with size "md"', () => {
    const { container } = renderLoading('md')
    const svgElement = container.querySelector('svg')
    expect(svgElement?.classList.value).toContain('w-[80px] h-[80px]')
  })

  test('renders correctly with size "lg"', () => {
    const { container } = renderLoading('lg')
    const svgElement = container.querySelector('svg')
    expect(svgElement?.classList.value).toContain(
      'w-[100px] h-[100px]',
    )
  })

  test('applies custom className', () => {
    const { container } = renderLoading(undefined, 'custom-class')
    const svgElement = container.querySelector('svg')
    expect(svgElement?.classList.value).toContain('custom-class')
  })
})
