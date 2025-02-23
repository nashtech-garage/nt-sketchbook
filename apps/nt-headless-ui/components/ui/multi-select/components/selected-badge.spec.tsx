import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SelectedBadge, SelectedBadgeProps } from './selected-badge'

describe('SelectedBadge', () => {
    const mockHandleUnselect = vi.fn()
    const option = { value: '1', label: 'Option 1' }

    const setup = (props?: Partial<SelectedBadgeProps>) => {
        return render(
            <SelectedBadge
                option={option}
                handleUnselect={mockHandleUnselect}
                disable={props?.disable ?? false}
            />,
        )
    }

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('renders correctly with given option', () => {
        setup()
        expect(screen.getByText(option.label)).toBeInTheDocument()
    })

    it('calls handleUnselect when remove button is clicked', () => {
        setup()
        const removeButton = screen.getByTestId(
            `remove-${option.value}`,
        )
        fireEvent.click(removeButton)
        expect(mockHandleUnselect).toHaveBeenCalledWith(option)
    })

    it('does not call handleUnselect when disabled', () => {
        setup({ disable: true })
        const removeButton = screen.getByTestId(
            `remove-${option.value}`,
        )
        fireEvent.click(removeButton)
        expect(mockHandleUnselect).not.toHaveBeenCalled()
    })

    it('applies correct class when disabled', () => {
        setup({ disable: true })
        const badge = screen.getByText(option.label).closest('div')
        expect(badge).toHaveClass(
            'bg-shade-neutral-9 border !border-shade-neutral-10 !cursor-not-allowed text-shade-neutral-70',
        )
    })
})
