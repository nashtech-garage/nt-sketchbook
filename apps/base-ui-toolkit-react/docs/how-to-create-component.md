# Creating a New Component

To create a new component following Atomic Design principles, follow these steps

## 1. Define the Component

Create a new file for your component in the appropriate directory (Atoms, Molecules, Organisms, etc.). For this example, let's create an Atom called `Button`.

```tsx
import React from 'react'

type ButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  )
}

export default Button
```

## 2. Write Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './'

test('Button renders with correct label', () => {
  render(<Button label="Click Me" onClick={() => {}} />)
  const buttonElement = screen.getByText(/Click Me/i)
  expect(buttonElement).toBeInTheDocument()
})

test('Button calls onClick when clicked', () => {
  const handleClick = jest.fn()
  render(<Button label="Click Me" onClick={handleClick} />)
  const buttonElement = screen.getByText(/Click Me/i)
  fireEvent.click(buttonElement)
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('Button is disabled when disabled prop is true', () => {
  render(<Button label="Click Me" onClick={() => {}} disabled />)
  const buttonElement = screen.getByText(/Click Me/i)
  expect(buttonElement).toBeDisabled()
})
```

## 3. Create a Storybook Entry

Add a Storybook entry to document and visualize your component.

```tsx
import React from 'react'
import { Meta, Story } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta

const Template: Story<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Click Me',
  onClick: () => alert('Button clicked!'),
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Click Me',
  onClick: () => {},
  disabled: true,
}
```

## 4. Export component in file src\components\atoms\index.ts

```ts
export { Button } from './button'
```

\*\*\* Note: please name file and folder by using `kebap-case`

By following these steps, you can create new components in your UI library that are well-typed, tested, and documented according to Atomic Design principles.
