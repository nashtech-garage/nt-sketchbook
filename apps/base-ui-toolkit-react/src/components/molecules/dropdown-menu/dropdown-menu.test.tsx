import {
    fireEvent,
    render,
    RenderResult,
} from '@testing-library/react'

import { DropdownItem, DropdownItemGroup, DropdownMenu } from '.'

describe('test dropdown menu component ', () => {
    let triggerButton: HTMLElement
    let rendered: RenderResult

    beforeEach(() => {
        rendered = render(
            <DropdownMenu trigger="Page actions">
                <DropdownItemGroup>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Share</DropdownItem>
                    <DropdownItem>Move</DropdownItem>
                    <DropdownItem>Clone</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                    <DropdownItem>Report</DropdownItem>
                </DropdownItemGroup>
            </DropdownMenu>,
        )
        triggerButton = rendered.getByText('Page actions')
    })

    it('renders trigger button correctly', () => {
        expect(triggerButton).toBeTruthy()
    })

    it('opens dropdown menu when trigger button is clicked', () => {
        fireEvent.click(triggerButton)
        const dropdownMenu = rendered.getByText('Edit')
        expect(dropdownMenu).toBeTruthy()
    })

    it('closes dropdown menu when clicking outside', () => {
        fireEvent.click(triggerButton)
        const dropdownMenu = rendered.getByText('Edit')
        expect(dropdownMenu).toBeTruthy()
        fireEvent.mouseDown(document)
        const closedDropdownMenu = rendered.queryByText('Edit')
        expect(closedDropdownMenu).toBeNull()
    })

    it('closes dropdown menu when clicking on a menu item', () => {
        fireEvent.click(triggerButton)
        const editMenuItem = rendered.getByText('Edit')
        fireEvent.click(editMenuItem)
        const closedDropdownMenu = rendered.queryByText('Edit')
        expect(closedDropdownMenu).toBeNull()
    })
})
