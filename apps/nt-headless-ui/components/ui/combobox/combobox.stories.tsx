import type { Meta, StoryObj } from '@storybook/react'

import type { ComboboxProps } from './combobox'
import { Combobox } from './combobox'

const meta: Meta<ComboboxProps> = {
    title: 'Components/Combobox',
    component: Combobox,
    argTypes: {},
    args: {
        options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' }
        ]
    }
}
export default meta

export const Default: StoryObj<ComboboxProps> = {
    args: {
        className: 'w-[200px]'
    }
}
