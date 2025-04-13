import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Modal } from './modal'

describe('Modal', () => {
    it('should not render when isOpen is false', () => {
        render(
            <Modal
                isOpen={false}
                content={<div>Body Content</div>}
            />,
        )
        expect(
            screen.queryByText('Body Content'),
        ).not.toBeInTheDocument()
    })

    it('should render when isOpen is true', async () => {
        await waitFor(() =>
            render(
                <Modal
                    isOpen
                    title="Test Title"
                    description="Test Description"
                    content={<div>Body Content</div>}
                    footer={<div>Footer Content</div>}
                />,
            ),
        )

        expect(screen.queryByText('Test Title')).toBeInTheDocument()
        expect(
            screen.queryByText('Test Description'),
        ).toBeInTheDocument()
        expect(screen.queryByText('Body Content')).toBeInTheDocument()
        expect(
            screen.queryByText('Footer Content'),
        ).toBeInTheDocument()
    })
})
