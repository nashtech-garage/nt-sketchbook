import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label, type LabelProps } from './label'

const defaultProps: LabelProps = {
    htmlFor: 'default-id',
    children: 'Default Label',
    className: undefined,
}

const setup = (props?: Partial<LabelProps>) =>
    render(<Label {...defaultProps} {...props} />)

describe('Label', () => {
    it('renders with text', () => {
        setup()
        expect(screen.getByText('Default Label')).toBeInTheDocument()
    })

    it('overrides default className when provided', () => {
        setup({ className: 'custom-class' })
        expect(screen.getByText('Default Label')).toHaveClass(
            'custom-class',
        )
    })

    it('renders with correct htmlFor and text content', () => {
        setup({ htmlFor: 'test-id', children: 'Test Label' })
        expect(screen.getByText('Test Label')).toHaveAttribute(
            'for',
            'test-id',
        )
    })
})
