import { fireEvent, render } from '@testing-library/react'

import { Drawer } from '.'

const onCloseMock = vi.fn()
describe('Drawer component', () => {
    const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }))
    afterEach(() => {
        vi.stubGlobal('ResizeObserver', ResizeObserverMock)
        vi.clearAllMocks()
    })
    it('renders on the right side by default', () => {
        const { getByTestId } = render(
            <Drawer isOpen onClose={() => {}} title="Test Title" />,
        )

        const drawerPanel = getByTestId('drawer-panel')
        expect(drawerPanel.className).toContain('justify-end')
    })

    it('renders on the left side when specified', () => {
        const { getByTestId } = render(
            <Drawer
                isOpen
                onClose={() => {}}
                title="Test Title"
                position="left"
            />,
        )

        const drawerPanel = getByTestId('drawer-panel')
        expect(drawerPanel.className).toContain('justify-start')
    })

    it('closes the drawer when close button is clicked', () => {
        const { getByTestId } = render(
            <Drawer isOpen onClose={onCloseMock} title="Test Title">
                Drawer Content
            </Drawer>,
        )

        const closeButton = getByTestId('close')
        fireEvent.click(closeButton)
        expect(onCloseMock).toHaveBeenCalled()
    })
})
