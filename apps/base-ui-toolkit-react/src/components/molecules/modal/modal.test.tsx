import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'

import { Modal } from '.'

const onCancel = vi.fn()
const onSubmit = onCancel

describe('Test render modal component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders with title and children when isOpen is true', () => {
    const title = 'Test Modal'
    const { getByText } = render(
      <Modal isOpen title={title}>
        <div>Modal Content</div>
      </Modal>,
    )

    expect(getByText(title)).toBeTruthy()
    expect(getByText('Modal Content')).toBeTruthy()
  })

  test('does not render when isOpen is false', () => {
    const { queryByTestId } = render(
      <Modal isOpen={false} title="Test Modal">
        <div>Modal Content</div>
      </Modal>,
    )

    expect(queryByTestId('modal-container')).not.toBeTruthy()
  })

  test('calls onCancel when overlay is clicked', () => {
    const { getByTestId } = render(
      <Modal isOpen title="Test Modal" onCancel={onCancel}>
        <div>Modal Content</div>
      </Modal>,
    )
    const overlay = getByTestId('modal-container')
    fireEvent.mouseDown(overlay)

    expect(onCancel).toHaveBeenCalled()
  })

  test('calls onCancel when cancel button is clicked', () => {
    const { getByText } = render(
      <Modal isOpen title="Test Modal" onCancel={onCancel}>
        <div>Modal Content</div>
      </Modal>,
    )
    const cancelButton = getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(onCancel).toHaveBeenCalled()
  })

  test('calls onSubmit when submit button is clicked', () => {
    const { getByText } = render(
      <Modal isOpen title="Test Modal" onSubmit={onSubmit}>
        <div>Modal Content</div>
      </Modal>,
    )
    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalled()
  })
})
