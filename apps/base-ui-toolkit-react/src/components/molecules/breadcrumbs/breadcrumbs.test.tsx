import { fireEvent, render, screen } from '@testing-library/react'

import { Breadcrumbs } from '.'
import { BreadcrumbItem } from './breadcrumb-item'

describe('Test Breadcrumbs component', () => {
  test('renders breadcrumbs with default props', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem>Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('About')).toBeTruthy()
    expect(screen.getByText('Contact')).toBeTruthy()
  })

  test('applies size, variant, and color classes', () => {
    render(
      <Breadcrumbs size="lg" variant="bordered" color="success">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem>Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    const breadcrumbList = screen.getByTestId('breadcrumb')
    expect(breadcrumbList.classList.value).toContain('text-lg')
    expect(breadcrumbList.classList.value).toContain(
      'border border-gray-300',
    )
    expect(breadcrumbList.classList.value).toContain('text-green-400')
  })

  test('renders custom separator', () => {
    render(
      <Breadcrumbs separator=">">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem>Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    expect(screen.getAllByText('>')).toHaveLength(2)
  })

  test('last breadcrumb item is not opaque', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem>Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    const items = screen.getAllByTestId('listitem')
    expect(items[items.length - 1].classList.value).not.contain(
      'opacity-50',
    )
  })

  test('handles onAction callback', () => {
    const onActionMock = vi.fn()
    render(
      <Breadcrumbs onAction={onActionMock}>
        <BreadcrumbItem key="home">Home</BreadcrumbItem>
        <BreadcrumbItem key="about">About</BreadcrumbItem>
        <BreadcrumbItem key="contact">Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    fireEvent.click(screen.getByText('Home'))
    fireEvent.click(screen.getByText('About'))

    expect(onActionMock).toHaveBeenCalledWith('home')
    expect(onActionMock).toHaveBeenCalledWith('about')
  })

  test('handles isDisabled prop', () => {
    render(
      <Breadcrumbs isDisabled>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem>Contact</BreadcrumbItem>
      </Breadcrumbs>,
    )

    const items = screen.getAllByTestId('listitem')
    items.forEach((item) => {
      expect(item.classList.value).contain('cursor-not-allowed')
    })
  })
})
