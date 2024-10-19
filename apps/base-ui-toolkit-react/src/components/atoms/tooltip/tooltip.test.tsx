import { render } from '@testing-library/react'

import { Tooltip } from '.'

describe('test tooltip component ', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <Tooltip message="Test Tooltip" position="bottom">
        <div>Hover me</div>
      </Tooltip>,
    )
    const tooltipMessage = getByText('Test Tooltip')
    expect(tooltipMessage).toBeTruthy()
  })

  it('renders with provided message', () => {
    const { getByText } = render(
      <Tooltip message="Custom Tooltip Message" position="bottom">
        <div>Hover me</div>
      </Tooltip>,
    )
    const tooltipMessage = getByText('Custom Tooltip Message')
    expect(tooltipMessage).toBeTruthy()
  })

  it('renders tooltip with right position', () => {
    const { getByTestId } = render(
      <Tooltip message="Test Tooltip" position="right">
        <div>Hover me</div>
      </Tooltip>,
    )
    const tooltip = getByTestId('tooltip')
    expect(tooltip.className).toContain('absolute left-[115%]')
  })

  it('renders tooltip with left position', () => {
    const { getByTestId } = render(
      <Tooltip message="Test Tooltip" position="left">
        <div>Hover me</div>
      </Tooltip>,
    )
    const tooltip = getByTestId('tooltip')
    expect(tooltip.className).toContain('absolute right-[115%]')
  })

  it('renders tooltip with top position', () => {
    const { getByTestId } = render(
      <Tooltip message="Test Tooltip" position="top">
        <div>Hover me</div>
      </Tooltip>,
    )
    const tooltip = getByTestId('tooltip')
    expect(tooltip.className).toContain('absolute bottom-[125%]')
  })
})
