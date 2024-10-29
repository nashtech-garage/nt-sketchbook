import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Tabs } from '.'
import { tabItems } from './tabs.stories'

describe('Test render tab', () => {
    it('should render horizontal tab', async () => {
        render(<Tabs items={tabItems} position="horizontal" />)
        expect(screen.getByTestId('horizontal')).toBeTruthy()
    })

    it('should render vertical tab', async () => {
        render(<Tabs items={tabItems} position="vertical" />)
        expect(screen.getByTestId('vertical')).toBeTruthy()
    })

    it('should will render all items', () => {
        render(<Tabs items={tabItems} position="horizontal" />)
        expect(screen.getAllByTestId('item')).toHaveLength(
            tabItems.length,
        )
    })
})
