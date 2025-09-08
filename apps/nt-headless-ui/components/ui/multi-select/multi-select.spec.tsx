import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User } from 'lucide-react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type {
    MultipleSelectProps,
    MultipleSelectVariant,
    Option
} from './multi-select'
import { MultipleSelect } from './multi-select'

const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
]

const variantStyles = {
    danger: 'nt-multi-select-danger',
    success: 'nt-multi-select-success',
    warning: 'nt-multi-select-warning'
}

const mockOnChange = vi.fn()

const defaultProps: MultipleSelectProps = {
    options,
    placeholder: 'Select options',
    onChange: mockOnChange
}

const setup = (props: Partial<MultipleSelectProps> = {}) => {
    render(<MultipleSelect {...defaultProps} {...props} />)
}

const user = userEvent.setup()

describe('MultipleSelect', () => {
    beforeEach(() => {
        mockOnChange.mockReset()
    })

    it('renders correctly with placeholder', () => {
        setup()

        expect(
            screen.getByPlaceholderText('Select options')
        ).toBeInTheDocument()
    })

    it('opens dropdown on input focus', async () => {
        setup()
        const input = screen.getByPlaceholderText('Select options')
        await user.click(input)

        expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('selects an option', async () => {
        setup()
        const input = screen.getByPlaceholderText('Select options')
        await user.click(input)
        await user.click(screen.getByText('Option 1'))

        expect(mockOnChange).toHaveBeenCalledWith([
            { value: 'option1', label: 'Option 1' }
        ])
    })

    it('removes selected option', async () => {
        setup({ initialOption: [options[0]] })
        const removeButton = screen.getByRole('button', { name: /×/ })
        await user.click(removeButton)

        expect(mockOnChange).toHaveBeenCalledWith([])
    })

    it('disables input when disabled prop is set', () => {
        setup({ disabled: true })
        const input = screen.getByRole('textbox')

        expect(input).toBeDisabled()
    })

    it.each(Object.entries(variantStyles))(
        'applies correct styles for variant: %s',
        (variant, expectedStyle) => {
            setup({ variant: variant as MultipleSelectVariant })
            const container =
                document.getElementsByClassName('nt-multi-select')[0]

            expect(container).toHaveClass(expectedStyle)
        }
    )

    it('renders iconLeft when provided', () => {
        setup({
            iconLeft: <User data-testid="icon-left" />,
            classIconLeft: 'custom-class'
        })

        expect(screen.getByTestId('icon-left')).toBeInTheDocument()
        expect(screen.getByTestId('icon-left')).toHaveClass(
            'custom-class'
        )
    })

    it('selects two options and calls onChange with both', async () => {
        setup()
        const input = screen.getByPlaceholderText('Select options')
        await user.click(input)
        await user.click(screen.getByText('Option 1'))

        await user.click(input)
        await user.click(screen.getByText('Option 2'))

        expect(mockOnChange).toHaveBeenCalledWith([
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
        ])
    })
})
