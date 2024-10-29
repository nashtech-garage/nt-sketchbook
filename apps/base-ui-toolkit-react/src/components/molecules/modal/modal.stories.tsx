import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/components/atoms/button'

import { Modal } from '.'

const meta: Meta<typeof Modal> = {
    component: Modal,
    tags: ['autodocs'],
    title: 'Components/Feedback/Modal',
    args: {
        cancelText: '',
        submitText: '',
        cancelWithOverlayClick: true,
    },
    argTypes: {
        width: {
            control: 'number',
        },
    },
}

export default meta
type Story = StoryObj<typeof Modal>

export const DefaultModal: Story = {
    render: () => {
        const [show, setShow] = useState(false)
        return (
            <>
                <Button onClick={() => setShow(true)}>
                    Open modal
                </Button>
                <Modal
                    title="Terms of Service"
                    onCancel={() => setShow(false)}
                    isOpen={show}
                >
                    <p>
                        With less than a month to go before the
                        European Union enacts new consumer privacy
                        laws for its citizens, companies around the
                        world are updating their terms of service
                        agreements to comply. The European Union’s
                        General Data Protection Regulation (G.D.P.R.)
                        goes into effect on May 25 and is meant to
                        ensure a common set of data rights in the
                        European Union. It requires organizations to
                        notify users as soon as possible of high-risk
                        data breaches that could personally affect
                        them.
                    </p>
                </Modal>
            </>
        )
    },
}
