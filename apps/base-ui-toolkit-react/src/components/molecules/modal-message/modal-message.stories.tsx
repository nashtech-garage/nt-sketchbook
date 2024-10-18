import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/components/atoms'

import { ModalMessage } from '.'

const meta: Meta<typeof ModalMessage> = {
  component: ModalMessage,
  tags: ['autodocs'],
  title: 'Components/General/Modal Message',
  args: {},
}

export default meta

type Story = StoryObj<typeof ModalMessage>

export const Deafult: Story = {
  argTypes: {},
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Message</Button>
        <ModalMessage
          isOpen={isOpen}
          title="Sucess"
          type="success"
          closeModal={() => setIsOpen(false)}
          autoCloseDuration
          duration={3000}
        />
      </>
    )
  },
}
