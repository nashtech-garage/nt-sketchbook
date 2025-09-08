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
    args: {},
    render: (args) => (
        <div className="w-[200px]">
            <Combobox {...args} />
        </div>
    )
}

export const WithManyOptions: StoryObj<ComboboxProps> = {
    args: {
        options: [
            { value: 'javascript', label: 'JavaScript' },
            { value: 'typescript', label: 'TypeScript' },
            { value: 'python', label: 'Python' },
            { value: 'java', label: 'Java' },
            { value: 'csharp', label: 'C#' },
            { value: 'php', label: 'PHP' },
            { value: 'ruby', label: 'Ruby' },
            { value: 'go', label: 'Go' }
        ]
    },
    render: (args) => (
        <div className="w-[250px]">
            <Combobox {...args} />
        </div>
    )
}

export const WithPlaceholder: StoryObj<ComboboxProps> = {
    args: {
        placeholder: 'Choose a framework...',
        options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue.js' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' }
        ]
    },
    render: (args) => (
        <div className="w-[200px]">
            <Combobox {...args} />
        </div>
    )
}
