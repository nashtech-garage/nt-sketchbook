import { fireEvent, render } from '@testing-library/react'

import { Avatar } from '.'

describe('Test avatar component', () => {
    it('renders with a custom size', () => {
        const { getByTestId } = render(<Avatar size="lg" />)
        const avatar = getByTestId('avatar')
        expect(avatar.classList.value).toContain('w-20 h-20')
    })

    it('renders with a custom radius', () => {
        const { getByTestId } = render(<Avatar radius="lg" />)
        const avatar = getByTestId('avatar')
        expect(avatar.classList.value).toContain('rounded-lg')
    })

    it('renders with a border when isBordered is true', () => {
        const { getByTestId } = render(<Avatar isBordered />)
        const avatar = getByTestId('avatar')
        expect(avatar.classList.value).toContain(
            'border-[4px] border-gray-300',
        )
    })

    it('renders with a custom fallback', () => {
        const { getByText } = render(
            <Avatar fallback={<span>Fallback</span>} />,
        )
        const fallback = getByText('Fallback')
        expect(fallback).toBeTruthy()
    })

    it('renders an image when src is provided', () => {
        const { getByRole } = render(
            <Avatar src="https://i.pravatar.cc/150" />,
        )
        const img = getByRole('img')
        expect(img.getAttribute('src')).toBe(
            'https://i.pravatar.cc/150',
        )
    })

    it('renders the invalid icon when image fails to load', () => {
        const { getByRole, getByTestId } = render(
            <Avatar src="invalid-url" />,
        )
        const img = getByRole('img')
        fireEvent.error(img)
        const fallbackIcon = getByTestId('invalid-url')
        expect(fallbackIcon).toBeTruthy()
    })
})
