import type { Config } from 'tailwindcss'

// const ntTheme = require('@nashtech/stylesheet/dist/nt-stylesheet.cjs')

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {},
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('tailwindcss-animate')],
} satisfies Config
