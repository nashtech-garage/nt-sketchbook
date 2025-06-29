import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../button'
import type { ModalProps } from './modal'
import { Modal } from './modal'

export default {
    title: 'Components/Modal',
    component: Modal,
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg']
        },
        isOpen: { control: false },
        title: { control: 'text' },
        description: { control: 'text' },
        footer: { control: false },
        className: { control: 'text' },
        classNameHeader: { control: 'text' }
    }
} as Meta

export const Default: StoryFn<ModalProps> = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal
            </Button>
            <Modal
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                footer={
                    <Button onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                }
            />
        </>
    )
}

Default.args = {
    title: 'Modal Title',
    description: 'This is a description for the modal.'
}
