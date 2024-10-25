import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Lorem from 'react-lorem-ipsum'

import { Button } from '@/components/atoms'

import { Drawer } from '.'

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
  title: 'Components/General/Drawer',
  args: {
    position: 'right',
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Deafult: Story = {
  argTypes: {
    position: {
      options: ['right', 'left'],
      control: 'select',
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    const { position } = args
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          title="Hello"
          isOpen={isOpen}
          position={position}
          onClose={() => setIsOpen(false)}
        >
          <Lorem p={1} />
        </Drawer>
      </>
    )
  },
}
