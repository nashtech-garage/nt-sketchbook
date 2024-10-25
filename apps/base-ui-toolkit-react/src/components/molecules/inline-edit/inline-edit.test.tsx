import { fireEvent, render, screen } from '@testing-library/react'

import { InlineEdit } from '.'

describe('Test inline edit component', () => {
  test('renders initial value', () => {
    render(<InlineEdit />)
    expect(screen.getByText('click here to edit')).toBeTruthy()
  })

  test('displays input when clicked', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    expect(screen.getByTestId('input-text')).toBeTruthy()
  })

  test('updates value on typing', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    const input = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Value' } })
    expect(input.value).toBe('New Value')
  })

  test('cancels edit mode on cancel button click', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    fireEvent.click(screen.getByTestId('cancel'))
    expect(screen.getByText('click here to edit')).toBeTruthy()
  })

  test('confirms edit mode on confirm button click', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    const input = screen.getByTestId('input-text')
    fireEvent.change(input, { target: { value: 'New Value' } })
    fireEvent.click(screen.getByTestId('confirm'))
  })

  test('confirms edit mode on Enter key press', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    const input = screen.getByTestId('input-text') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'New Value' } })
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })

    expect(input.value).toBe('New Value')
  })

  test('reverts to old value on cancel button click', () => {
    render(<InlineEdit />)
    fireEvent.click(screen.getByText('click here to edit'))
    const input = screen.getByTestId('input-text')
    fireEvent.change(input, { target: { value: 'New Value' } })
    fireEvent.click(screen.getByTestId('cancel'))
    expect(screen.getByText('click here to edit')).toBeTruthy()
  })
})
