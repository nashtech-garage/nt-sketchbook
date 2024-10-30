import { fireEvent, render, screen } from '@testing-library/react'

import {
    getProgressBarClassName,
    ProgressTracker,
    ProgressTrackerItem,
    ProgressTrackerProps,
} from '.'

const mockItems = [
    { id: '1', label: 'Step 1', status: 'visited' },
    { id: '2', label: 'Step 2', status: 'current' },
    { id: '3', label: 'Step 3', status: 'unvisited' },
    { id: '4', label: 'Step 4', status: 'unvisited' },
] as ProgressTrackerItem[]

const mockOnChangeStep = vi.fn()

const defaultProps: ProgressTrackerProps = {
    items: mockItems,
    onChangeStep: mockOnChangeStep,
}

describe('ProgressTracker', () => {
    test('renders all steps', () => {
        render(<ProgressTracker {...defaultProps} />)

        mockItems.forEach((item: ProgressTrackerItem) => {
            expect(
                screen.getByText(item.label as string),
            ).toBeTruthy()
        })
    })

    test('renders the correct status icons', () => {
        render(<ProgressTracker {...defaultProps} />)
        expect(screen.getAllByTestId('progressBar')).toHaveLength(1)
        expect(screen.getByText('Step 1')).toBeTruthy()
        expect(screen.getAllByTestId('dot-icon')).toHaveLength(2)
    })

    test('handles step click', () => {
        render(<ProgressTracker {...defaultProps} />)

        fireEvent.click(screen.getByText('Step 2'))
        expect(mockOnChangeStep).toHaveBeenCalledWith(mockItems[1])
    })

    test('disables click for unvisited and disabled steps', () => {
        const mockChangeStep = vi.fn()
        render(
            <ProgressTracker
                {...defaultProps}
                onChangeStep={mockChangeStep}
            />,
        )

        fireEvent.click(screen.getByText('Step 3'))
        expect(mockChangeStep).not.toHaveBeenCalled()

        fireEvent.click(screen.getByText('Step 4'))
        expect(mockChangeStep).not.toHaveBeenCalled()
    })

    test('applies correct class names', () => {
        render(<ProgressTracker {...defaultProps} />)

        const step1 = screen.getByText('Step 1')
        expect(step1.classList.value).toContain(
            'cursor-pointer text-gray-500',
        )

        const step2 = screen.getByText('Step 2')
        expect(step2.classList.value).toContain(
            'text-blue-500 font-semibold',
        )

        const step3 = screen.getByText('Step 3')
        expect(step3.classList.value).toContain(
            'cursor-not-allowed pointer-events-none',
        )

        const step4 = screen.getByText('Step 4')
        expect(step4.classList.value).toContain(
            'cursor-not-allowed pointer-events-none',
        )
    })
})

describe('test progressBar ClassName', () => {
    it('returns empty string when spacing is not default', () => {
        const items = [
            { id: '1', label: 'Step 1', status: 'visited' },
            { id: '2', label: 'Step 2', status: 'visited' },
            { id: '3', label: 'Step 3', status: 'visited' },
        ]
        const result = getProgressBarClassName(
            0,
            items as ProgressTrackerItem[],
            'comfortable',
        )
        expect(result).toBe('')
    })

    it('returns "rounded-none rounded-l-full" for the first item when spacing is default', () => {
        const items = [
            { id: '1', label: 'Step 1', status: 'visited' },
            { id: '2', label: 'Step 2', status: 'visited' },
            { id: '3', label: 'Step 3', status: 'visited' },
        ]
        const result = getProgressBarClassName(
            0,
            items as ProgressTrackerItem[],
            'default',
        )
        expect(result).toBe('rounded-none rounded-l-full')
    })

    it('returns "rounded-none rounded-r-full" for the last visited/disabled item when spacing is default', () => {
        const items = [
            { id: '1', label: 'Step 1', status: 'visited' },
            { id: '2', label: 'Step 2', status: 'visited' },
            { id: '3', label: 'Step 3', status: 'visited' },
        ]
        const result = getProgressBarClassName(
            2,
            items as ProgressTrackerItem[],
            'default',
        )
        expect(result).toBe('rounded-none rounded-r-full')
    })

    it('returns "rounded-none" for a middle item when spacing is default', () => {
        const items = [
            { id: '1', label: 'Step 1', status: 'visited' },
            { id: '2', label: 'Step 2', status: 'visited' },
            { id: '3', label: 'Step 3', status: 'visited' },
        ]
        const result = getProgressBarClassName(
            1,
            items as ProgressTrackerItem[],
            'default',
        )
        expect(result).toBe('rounded-none ')
    })
})
