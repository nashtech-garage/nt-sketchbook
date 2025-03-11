import { Meta, StoryObj } from '@storybook/react'
import { Bus, Car, Truck } from 'lucide-react'

import { Combobox, ComboboxProps } from './combobox'

const meta: Meta<ComboboxProps> = {
    title: 'Components/Combobox',
    component: Combobox,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['default', 'danger', 'success', 'warning'],
            },
        },
    },
    args: {
        options: [
            { value: 'react', label: 'React', icon: <Car /> },
            { value: 'vue', label: 'Vue', icon: <Bus /> },
            { value: 'angular', label: 'Angular', icon: <Truck /> },
        ],
    },
}
export default meta

export const Default: StoryObj<ComboboxProps> = {
    args: {},
}
