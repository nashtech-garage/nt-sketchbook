import type { Preview } from '@storybook/react'

import '../src/tailwind/theme.css'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },

    tags: ['autodocs'],
}

export default preview
