import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
    it('renders the checkbox', () => {
        render(<Checkbox />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })

    it('renders the checkbox with label and info icon', () => {
        const wrapper = render(
            <Checkbox
                label="paragraph label"
                htmlFor="item"
                info={true}
            />,
        )
        const checkbox = screen.getByRole('checkbox')
        const label = screen.getByText('paragraph label')
        const icon = wrapper.container.querySelector(
            '.nt-checkbox-info',
        )
        expect(checkbox).toBeInTheDocument()
        expect(label).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
    })

    it('renders when checkbox, label, icon when disabled', () => {
        const wrapper = render(
            <Checkbox
                label="paragraph label"
                htmlFor="item"
                info={true}
                disabled
            />,
        )
        const checkbox = screen.getByRole('checkbox')
        const label =
            wrapper.container.querySelector('.checkbox-label')
        const icon = wrapper.container.querySelector(
            '.nt-checkbox-info',
        )
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toBeDisabled()
        expect(label).toBeInTheDocument()
        expect(label).toHaveClass('disabled')
        expect(icon).toBeInTheDocument()
    })
})
