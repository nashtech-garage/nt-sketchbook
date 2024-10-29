import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Portal } from '.'

describe('Portal', () => {
    it('renders', () => {
        render(<Portal />)
        expect(screen.getByTestId('portal')).toBeTruthy()
    })
})
