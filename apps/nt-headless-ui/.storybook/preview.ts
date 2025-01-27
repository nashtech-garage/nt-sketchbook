import '../app/globals.css'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            method: 'alphabetical',
            order: [
                'Foundation',
                ['Colors', ['Shades']],
                'Components',
            ],
        },
    },
}
export const tags = ['autodocs', 'autodocs']
