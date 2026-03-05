import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_FORMAT, NtDatePicker } from './nt-date-picker'

const setup = async () => {
    document.body.innerHTML = `
        <input data-nt-datepicker data-format="${DEFAULT_FORMAT}" />
    `
    new NtDatePicker()
}
const now = new Date()
const mockDay = 11
const mockCurrentYear = now.getFullYear()
const mockMonth = now.getMonth()
const mockFormat = 'yyyy-MM-dd'

describe('NtDatePicker', () => {
    beforeEach(() => (document.body.innerHTML = ''))

    it('opens panel when input is clicked', async () => {
        await setup()

        await userEvent.click(screen.getByRole('textbox'))

        expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('sets input value when date selected', async () => {
        await setup()

        const input = screen.getByRole('textbox')

        await userEvent.click(input)

        await userEvent.click(await screen.getByText(mockDay))

        expect(input).toHaveValue(
            format(
                new Date(now.getFullYear(), now.getMonth(), mockDay),
                DEFAULT_FORMAT
            )
        )
    })

    it('uses custom format from dataset', async () => {
        await setup()

        const input = screen.getByRole('textbox')
        input.dataset.format = mockFormat

        await userEvent.click(input)

        await userEvent.click(await screen.getByText(mockDay))

        expect(input).toHaveValue(
            format(
                new Date(mockCurrentYear, mockMonth, mockDay),
                mockFormat
            )
        )
    })

    it('closes panel when clicking outside', async () => {
        setup()

        await userEvent.click(screen.getByRole('textbox'))

        const panel = screen.getByRole('group')

        expect(panel).toBeVisible()

        const outside = document.createElement('div')
        document.body.appendChild(outside)

        await userEvent.click(outside)

        expect(panel).not.toBeVisible()
    })

    it('changes month when selecting month and updates input value', async () => {
        await setup()

        const input = screen.getByRole('textbox')

        await userEvent.click(input)

        await userEvent.selectOptions(
            await screen.getByRole('combobox', {
                name: /month/i
            }),
            String(mockMonth)
        )

        await userEvent.click(await screen.getByText(mockDay))

        expect(input).toHaveValue(
            format(
                new Date(
                    now.getFullYear(),
                    Number(mockMonth),
                    mockDay
                ),
                DEFAULT_FORMAT
            )
        )
    })

    it('changes year when selecting year and updates input value', async () => {
        await setup()

        const input = screen.getByRole('textbox')

        await userEvent.click(input)

        const newYear = now.getFullYear() + 1

        await userEvent.selectOptions(
            await screen.getByRole('combobox', {
                name: /year/i
            }),
            String(newYear)
        )

        await userEvent.click(await screen.getByText(mockDay))

        expect(input).toHaveValue(
            format(
                new Date(newYear, mockMonth, mockDay),
                DEFAULT_FORMAT
            )
        )
    })
})
