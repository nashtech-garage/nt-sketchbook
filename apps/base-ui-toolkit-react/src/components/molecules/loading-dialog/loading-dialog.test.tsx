import { render } from '@testing-library/react'

import { LoadingDialog } from '.'

describe('Test render LoadingDialog Component', () => {
    test('renders loading dialog when isOpen is true', () => {
        const { getByTestId } = render(<LoadingDialog isOpen />)
        const dialog = getByTestId('loading-dialog')
        expect(dialog).toBeTruthy()
    })

    test('does not render loading dialog when isOpen is false', () => {
        const { queryByTestId } = render(
            <LoadingDialog isOpen={false} />,
        )
        const dialog = queryByTestId('loading-dialog')
        expect(dialog).not.toBeTruthy()
    })
})
