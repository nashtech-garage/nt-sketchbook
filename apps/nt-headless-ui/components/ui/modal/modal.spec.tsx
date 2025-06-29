import {
    cleanup,
    fireEvent,
    render,
    screen
} from '@testing-library/react'
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { Modal, type ModalProps } from './modal'

const defaultProps: ModalProps = {
    isOpen: true,
    title: 'Test Modal',
    description: 'Test description',
    onClose: vi.fn(),
    children: <p>Modal body content</p>
}

const setup = (overrideProps: Partial<ModalProps> = {}) => {
    render(<Modal {...defaultProps} {...overrideProps} />)
}

describe('Modal component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    it('renders title, description, and children', () => {
        setup()

        expect(screen.getByText('Test Modal')).toBeInTheDocument()
        expect(
            screen.getByText('Test description')
        ).toBeInTheDocument()
        expect(
            screen.getByText('Modal body content')
        ).toBeInTheDocument()
    })

    it('renders footer if provided', () => {
        setup({
            footer: <button>Confirm</button>
        })

        expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
        setup({ isOpen: false })

        expect(
            screen.queryByText('Test Modal')
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText('Modal body content')
        ).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        setup()

        fireEvent.click(screen.getByText('×'))
        expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('applies className and classNameHeader', () => {
        setup({
            className: 'custom-modal',
            classNameHeader: 'custom-header'
        })

        const modalBox = document.querySelector('.nt-modal-box')!
        const modalHeader = document.querySelector(
            '.nt-modal-header'
        )!

        expect(modalBox.className).toContain('custom-modal')
        expect(modalHeader.className).toContain('custom-header')
    })
})
