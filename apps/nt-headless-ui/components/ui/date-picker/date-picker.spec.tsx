import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { DatePickerProps } from './date-picker'
import { DatePicker } from './date-picker'

const mockOnChange = vi.fn()

const defaultProps: DatePickerProps = {
    selected: null,
    onChange: mockOnChange
}

const setup = (props?: Partial<DatePickerProps>) =>
    render(<DatePicker {...defaultProps} {...props} />)

describe('DatePicker', () => {
    it('renders the date input', () => {
        setup()

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('opens calendar when input is clicked', async () => {
        setup()

        const input = screen.getByRole('textbox')
        await input.click()

        expect(
            document.querySelector('.react-datepicker')
        ).toBeInTheDocument()
    })

    it('renders formatted date value', () => {
        setup({
            selected: new Date('2024-01-01'),
            dateFormat: 'dd/MM/yyyy'
        })

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('01/01/2024')
    })

    it('calls onChange when a date is selected', async () => {
        setup()

        const input = screen.getByRole('textbox')
        await input.click()

        const day = screen.getByRole('gridcell', {
            name: 'Choose Saturday, January 31st, 2026'
        })
        await day.click()

        expect(mockOnChange).toHaveBeenCalled()
    })
})
