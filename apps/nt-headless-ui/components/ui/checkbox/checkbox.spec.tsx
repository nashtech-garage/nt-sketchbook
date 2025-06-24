import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import type { CheckboxProps } from './checkbox'
import { Checkbox } from './checkbox'

const setup = (props?: CheckboxProps) =>
    render(<Checkbox {...props} />)

describe('Checkbox', () => {
    it('renders the checkbox', () => {
        setup()
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })

    it('renders the checkbox with label and info icon', () => {
        setup({
            label: 'paragraph label'
        })
        const checkbox = screen.getByRole('checkbox')
        const label = screen.getByText('paragraph label')
        expect(checkbox).toBeInTheDocument()
        expect(label).toBeInTheDocument()
    })

    it('renders when checkbox, label, icon when disabled', () => {
        const wrapper = setup({
            label: 'paragraph label',
            disabled: true
        })
        const checkbox = screen.getByRole('checkbox')
        const label = wrapper.container.querySelector('.nt-checkbox')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toBeDisabled()
        expect(label).toBeInTheDocument()
        expect(label).toHaveClass('disabled')
    })
})
