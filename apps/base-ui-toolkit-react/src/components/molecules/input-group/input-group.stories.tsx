import type { Meta, StoryObj } from '@storybook/react'

import { InputGroup } from '.'

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  tags: ['autodocs'],
  title: 'Components/Data Entry/Input Group',
  argTypes: {
    theme: {
      options: ['primary', 'default'],
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof InputGroup>

export const TextInputGroup: Story = {
  args: {
    label: 'First name',
    inputType: {
      type: 'text',
    },
  },
}
export const NumberInputGroup: Story = {
  args: {
    label: 'Phone',
    inputType: {
      type: 'number',
    },
  },
}

export const Radio: Story = {
  args: {
    label: 'Gender',
    inputType: {
      type: 'radio',
      listRadio: [
        {
          label: 'Female',
          id: 'fe',
          value: 'fe',
          name: 'gender',
        },
        {
          label: 'Male',
          id: 'ma',
          value: 'ma',
          name: 'gender',
        },
      ],
    },
  },
}

export const Checkbox: Story = {
  args: {
    label: 'Colors',
    inputType: {
      type: 'checkbox',
      label: 'Red',
      id: 'checkbox',
      value: 'red',
    },
  },
}

export const DatePicker: Story = {
  args: {
    label: 'Date of birth',
    inputType: {
      type: 'date-picker',
      onChange: () => null,
    },
  },
}
