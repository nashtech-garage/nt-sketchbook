import { render } from '@testing-library/react'

import { InputGroup } from '.'

describe('InputGroup Component', () => {
    test('renders input text element when type is "text"', () => {
        const { getByTestId } = render(
            <InputGroup inputType={{ type: 'text' }} />,
        )
        const inputElement = getByTestId('input-text')
        expect(inputElement).toBeTruthy()
    })

    test('renders input number element when type is "number"', () => {
        const { getByTestId } = render(
            <InputGroup inputType={{ type: 'number' }} />,
        )
        const inputElement = getByTestId('input-number')
        expect(inputElement).toBeTruthy()
    })

    test('renders date picker element when type is "date-picker"', () => {
        const { getByTestId } = render(
            <InputGroup
                inputType={{ type: 'date-picker', onChange: vi.fn() }}
            />,
        )
        const inputElement = getByTestId('date-picker')
        expect(inputElement).toBeTruthy()
    })

    test('renders checkbox element when type is "checkbox"', () => {
        const { getByTestId } = render(
            <InputGroup
                inputType={{ type: 'checkbox', label: 'checkbox' }}
            />,
        )
        const inputElement = getByTestId('checkbox')
        expect(inputElement).toBeTruthy()
    })

    test('renders radio group elements when type is "radio"', () => {
        const listRadio = [
            { id: 'radio1', label: 'Radio 1', value: 'value1' },
            { id: 'radio2', label: 'Radio 2', value: 'value2' },
        ]
        const { getAllByTestId } = render(
            <InputGroup inputType={{ type: 'radio', listRadio }} />,
        )
        const radioGroup = getAllByTestId('radio')
        expect(radioGroup).toHaveLength(2)
    })
})
