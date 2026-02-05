import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vitest } from 'vitest'

import {
    Radio,
    type RadioDirection,
    RadioGroup,
    type RadioGroupProps,
    type RadioProps
} from './radio-group'

const defaultRadioProps: RadioProps = {
    id: 'radio1',
    label: 'Default Option',
    name: 'choice',
    value: '1'
}

const defaultRadioGroupItems: RadioProps[] = [
    { id: 'r1', label: 'Option 1', name: 'choice', value: '1' },
    {
        id: 'r2',
        label: 'Option 2',
        name: 'choice',
        value: '2',
        disabled: true
    },
    { id: 'r3', label: 'Option 3', name: 'choice', value: '3' }
]

const setupRadio = (overrideProps: Partial<RadioProps> = {}) => {
    render(<Radio {...defaultRadioProps} {...overrideProps} />)
}

const setupRadioGroup = (
    overrideProps: Partial<RadioGroupProps> = {}
) => {
    const props: RadioGroupProps = {
        items: defaultRadioGroupItems,
        direction: 'column',
        ...overrideProps
    }
    render(<RadioGroup {...props} />)
}

describe('Radio', () => {
    it('renders with label and associates input with id', () => {
        setupRadio()
        const input = screen.getByRole('radio', {
            name: 'Default Option'
        })
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('id', 'radio1')
        expect(input).toHaveAttribute('name', 'choice')
    })

    it('passes disabled prop and applies className', () => {
        setupRadio({ disabled: true, className: 'custom-class' })
        expect(
            screen.getByRole('radio', {
                name: 'Default Option'
            })
        ).toBeDisabled()
        expect(
            screen.getByText('Default Option').closest('label')
        ).toHaveClass('nt-radio custom-class')
    })

    it('fires onChange when clicked', async () => {
        const onChange = vitest.fn()
        setupRadio({ onChange })
        await userEvent.click(
            screen.getByRole('radio', {
                name: 'Default Option'
            })
        )
        expect(onChange).toHaveBeenCalledTimes(1)
    })
})

describe('RadioGroup', () => {
    it('renders all radio items with correct labels', () => {
        setupRadioGroup()
        defaultRadioGroupItems.forEach(({ label }) => {
            expect(
                screen.getByText(label as string)
            ).toBeInTheDocument()
        })
    })

    it.each([
        ['column', 'nt-radio-column'],
        ['row', 'nt-radio-row']
    ])(
        'applies direction class for direction=%s',
        (direction, expectedClass) => {
            const { container } = render(
                <RadioGroup
                    items={defaultRadioGroupItems}
                    direction={direction as RadioDirection}
                />
            )
            expect(container.firstChild).toHaveClass(expectedClass)
        }
    )

    it('passes className to container div', () => {
        setupRadioGroup({ className: 'extra-class' })
        expect(screen.getByRole('group')).toHaveClass('extra-class')
    })
})
