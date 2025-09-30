import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Select, type SelectProps } from './select'

const onChangeMock = vi.fn()

const defaultProps: SelectProps = {
    options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' }
    ],
    placeholder: 'Pick fruit',
    onChange: onChangeMock
}

const setup = (props: Partial<SelectProps> = {}) => {
    render(<Select {...defaultProps} {...props} />)
}

describe('Select', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        onChangeMock.mockClear()
    })

    it('renders with placeholder', () => {
        setup()
        const select = screen.getByRole('combobox')
        expect(select).toHaveDisplayValue('Pick fruit')
    })

    it('renders options when provided', () => {
        setup()
        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(2)
    })

    it('renders optgroups when groups are provided', () => {
        setup({
            options: [],
            groups: [
                {
                    label: 'Group 1',
                    options: [{ value: 'g1o1', label: 'G1 Opt 1' }]
                }
            ]
        })
        expect(
            screen.getByRole('group', { name: 'Group 1' })
        ).toBeInTheDocument()
        expect(screen.getByText('G1 Opt 1')).toBeInTheDocument()
    })

    it('calls onChange when a new option is selected', async () => {
        setup()
        const select = screen.getByRole('combobox')

        await userEvent.selectOptions(select, 'apple')

        expect(onChangeMock).toHaveBeenCalledWith('apple')
    })

    it('applies correct variant and size classes', () => {
        setup({ variant: 'danger', size: 'large' })
        const select = screen.getByRole('combobox')
        expect(select.className).toMatch(/nt-select-danger/)
        expect(select.className).toMatch(/nt-select-large/)
    })

    it('respects the disabled prop', async () => {
        setup({ disabled: true })
        const select = screen.getByRole('combobox')
        expect(select).toBeDisabled()

        await userEvent.selectOptions(select, 'apple')
        expect(onChangeMock).not.toHaveBeenCalled()
    })

    it('renders icon when iconLeft is provided', () => {
        const TestIcon = () => <span data-testid="icon">*</span>
        setup({ iconLeft: <TestIcon /> })
        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })
})
