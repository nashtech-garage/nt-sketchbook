import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UploadFile } from './upload-file'

describe('UploadFile component', () => {
    it('renders the upload button with the correct placeholder', () => {
        render(<UploadFile placeholder="Upload your file" />)
        expect(
            screen.getByText('Upload your file')
        ).toBeInTheDocument()
    })

    it('calls onChange when a file is selected', () => {
        const handleChange = vi.fn()
        render(<UploadFile onChange={handleChange} />)

        const input = screen.getByLabelText(
            'Upload file'
        ) as HTMLInputElement
        const file = new File(['content'], 'test-file.txt', {
            type: 'text/plain'
        })

        fireEvent.change(input, { target: { files: [file] } })
        expect(handleChange).toHaveBeenCalledWith([file])
    })

    it('supports multiple file selection', () => {
        const handleChange = vi.fn()
        render(<UploadFile onChange={handleChange} multiple />)

        const input = screen.getByLabelText(
            'Upload file'
        ) as HTMLInputElement
        const file1 = new File(['content1'], 'file1.txt', {
            type: 'text/plain'
        })
        const file2 = new File(['content2'], 'file2.txt', {
            type: 'text/plain'
        })

        fireEvent.change(input, { target: { files: [file1, file2] } })

        expect(handleChange).toHaveBeenCalledWith([file1, file2])
        expect(screen.getByText('file1.txt')).toBeInTheDocument()
        expect(screen.getByText('file2.txt')).toBeInTheDocument()
    })

    it('removes a file when the remove button is clicked', () => {
        const handleChange = vi.fn()
        render(<UploadFile onChange={handleChange} />)

        const input = screen.getByLabelText(
            'Upload file'
        ) as HTMLInputElement
        const file = new File(['content'], 'test-file.txt', {
            type: 'text/plain'
        })

        fireEvent.change(input, { target: { files: [file] } })
        const removeButton = screen.getByRole('button')

        fireEvent.click(removeButton)
        expect(handleChange).toHaveBeenCalledWith([])
    })

    it('handles file drop correctly', () => {
        const handleChange = vi.fn()
        render(<UploadFile onChange={handleChange} />)

        const dropzone = screen.getByText('Upload file')
        const file = new File(['content'], 'dropped-file.txt', {
            type: 'text/plain'
        })

        fireEvent.drop(dropzone, {
            dataTransfer: { files: [file] }
        })

        expect(handleChange).toHaveBeenCalledWith([file])
    })
})
