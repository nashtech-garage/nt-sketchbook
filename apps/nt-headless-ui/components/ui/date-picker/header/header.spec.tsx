import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { describe, expect, it, vi } from 'vitest'

import { DatePickerHeader } from './header'

const mockChangeYear = vi.fn()
const mockChangeMonth = vi.fn()
const mockDecreaseMonth = vi.fn()
const mockIncreaseMonth = vi.fn()
const mockDecreaseYear = vi.fn()
const mockIncreaseYear = vi.fn()

const defaultProps: ReactDatePickerCustomHeaderProps = {
    date: new Date('2024-03-15'),
    changeYear: mockChangeYear,
    changeMonth: mockChangeMonth,
    decreaseMonth: mockDecreaseMonth,
    increaseMonth: mockIncreaseMonth,
    prevMonthButtonDisabled: false,
    nextMonthButtonDisabled: false,
    customHeaderCount: 0,
    monthDate: new Date('2024-03-15'),
    decreaseYear: mockDecreaseYear,
    increaseYear: mockIncreaseYear,
    prevYearButtonDisabled: false,
    nextYearButtonDisabled: false
}

const setup = (props?: Partial<ReactDatePickerCustomHeaderProps>) => {
    return render(<DatePickerHeader {...defaultProps} {...props} />)
}

describe('DatePickerHeader', () => {
    it('renders current month and year', () => {
        setup()

        expect(screen.getByDisplayValue('Mar')).toBeInTheDocument()
        expect(screen.getByDisplayValue('2024')).toBeInTheDocument()
    })

    it('calls decreaseMonth when clicking previous button', async () => {
        setup()

        const [prevButton] = screen.getAllByRole('button')
        await userEvent.click(prevButton)

        expect(mockDecreaseMonth).toHaveBeenCalledTimes(1)
    })

    it('calls increaseMonth when clicking next button', async () => {
        setup()
        const [, nextButton] = screen.getAllByRole('button')
        await userEvent.click(nextButton)

        expect(mockIncreaseMonth).toHaveBeenCalledTimes(1)
    })

    it('calls changeMonth with correct month index when month is changed', async () => {
        setup()

        await userEvent.selectOptions(
            screen.getByDisplayValue('Mar'),
            'May'
        )

        expect(mockChangeMonth).toHaveBeenCalledWith(4)
    })

    it('calls changeYear when year is changed', async () => {
        setup()

        await userEvent.selectOptions(
            screen.getByDisplayValue('2024'),
            '2026'
        )

        expect(mockChangeYear).toHaveBeenCalledWith(2026)
    })

    it('disables navigation buttons when disabled flags are true', () => {
        setup({
            prevMonthButtonDisabled: true,
            nextMonthButtonDisabled: true
        })

        const [prevButton, nextButton] = screen.getAllByRole('button')

        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeDisabled()
    })
})
