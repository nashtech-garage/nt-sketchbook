import { fireEvent, render } from '@testing-library/react'

import { Toggle } from '.'

describe('Test toggle component', () => {
    const getToggleInput = (onChangeMock?: () => void) =>
        render(<Toggle onChange={onChangeMock} />).getByTestId(
            'toggle',
        ) as HTMLInputElement

    it('renders with default props', () => {
        const toggleInput = getToggleInput()
        expect(toggleInput).toBeTruthy()
        expect(toggleInput.checked).toBe(false)
    })

    it('renders with provided label', () => {
        const { getByText } = render(<Toggle label="Test Toggle" />)
        const labelElement = getByText('Test Toggle')
        expect(labelElement).toBeTruthy()
    })

    it('calls onChange callback when toggled', () => {
        const onChangeMock = vi.fn()
        const toggleInput = getToggleInput(onChangeMock)
        fireEvent.click(toggleInput)
        expect(onChangeMock).toHaveBeenCalledWith(true)
    })

    it('toggles state correctly when clicked', () => {
        const toggleInput = getToggleInput()
        fireEvent.click(toggleInput)
        expect(toggleInput.checked).toBe(true)
    })
})
