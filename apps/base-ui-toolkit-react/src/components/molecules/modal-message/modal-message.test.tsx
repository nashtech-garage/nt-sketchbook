import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react'

import { ModalMessage } from '.'

describe('Tes modal message', () => {
    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }))
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true })
    })
    afterEach(() => {
        vi.stubGlobal('ResizeObserver', ResizeObserverMock)
        vi.clearAllMocks()
    })

    const defaultProps = {
        isOpen: true,
        title: 'Test Modal',
        text: 'This is a test modal.',
        closeModal: vi.fn(),
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
        autoCloseDuration: true,
        duration: 5000,
    }

    it('renders correctly with default props', () => {
        render(<ModalMessage {...defaultProps} />)
        expect(screen.getByText('Test Modal')).toBeTruthy()
        expect(screen.getByText('This is a test modal.')).toBeTruthy()
    })

    it('triggers onConfirm and closeModal when confirm button is clicked', () => {
        render(<ModalMessage {...defaultProps} />)
        fireEvent.click(screen.getByText('OK'))
        expect(defaultProps.onConfirm).toHaveBeenCalled()
        expect(defaultProps.closeModal).toHaveBeenCalled()
    })

    it('triggers onCancel and closeModal when cancel button is clicked', () => {
        render(<ModalMessage {...defaultProps} />)
        fireEvent.click(screen.getByText('Cancel'))
        expect(defaultProps.onCancel).toHaveBeenCalled()
        expect(defaultProps.closeModal).toHaveBeenCalled()
    })

    it('auto closes after the specified duration', async () => {
        const newProps = { ...defaultProps }
        render(<ModalMessage {...newProps} />)
        vi.advanceTimersByTime(5000)
        expect(newProps.closeModal).toHaveBeenCalled()
    })

    it('decreases the progress bar over time', async () => {
        const newProps = { ...defaultProps }
        render(<ModalMessage {...newProps} />)
        const progressBar = screen.getByTestId('progressbar')
        expect(progressBar.style.width).toEqual('100%')

        vi.advanceTimersByTime(2500)
        await waitFor(() =>
            expect(progressBar.style.width).toEqual('50%'),
        )
        vi.advanceTimersByTime(2500)
        await waitFor(() =>
            expect(progressBar.style.width).toEqual('0%'),
        )
    })

    it('does not show progress bar if autoCloseDuration is false', () => {
        render(
            <ModalMessage
                {...defaultProps}
                autoCloseDuration={false}
            />,
        )
        expect(screen.queryByRole('progressbar')).not.toBeTruthy()
    })
})
