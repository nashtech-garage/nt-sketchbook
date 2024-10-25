import { render } from '@testing-library/react'

import { ProgressBar, ProgressBarType } from '.'

const renderProgressBar = (props: ProgressBarType) => {
  const { getByTestId } = render(<ProgressBar {...props} />)
  const progressBar = getByTestId('progressBar')
  return { progressBar }
}

describe('ProgressBar component', () => {
  test('renders correctly with default props', () => {
    const { progressBar } = renderProgressBar({ value: 50 })
    expect(progressBar).toBeTruthy()
    expect(progressBar.style.width).toContain('50%')
  })

  test('renders correctly with custom className', () => {
    const { progressBar } = renderProgressBar({
      value: 50,
      className: {
        wrapper: 'custom-class',
      },
    })
    expect(
      progressBar.getElementsByClassName('custom-class'),
    ).toBeTruthy()
    expect(progressBar.style.width).toContain('50%')
  })

  test('renders indeterminate progress correctly', () => {
    const { progressBar } = renderProgressBar({
      value: 50,
      isIndeterminate: true,
    })
    expect(progressBar).toBeTruthy()
    expect(progressBar.style.width).toContain('100%')
  })

  test('renders correctly with value exceeding 100', () => {
    const { progressBar } = renderProgressBar({
      value: 120,
      isIndeterminate: true,
    })
    expect(progressBar).toBeTruthy()
    expect(progressBar.style.width).toContain('100%')
  })

  test('renders correctly with value below 0', () => {
    const { progressBar } = renderProgressBar({
      value: -1,
      isIndeterminate: true,
    })
    expect(progressBar).toBeTruthy()
    expect(progressBar.style.width).toContain('0%')
  })
})
