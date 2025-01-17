import type { Config } from 'tailwindcss'

import ntTheme from '../nt-stylesheet/dist/nt-stylesheet.cjs'

export default {
    darkMode: ['class'],
    content: [
        '../nt-stylesheet/dist/**/*.css',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: ntTheme.extend,
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('tailwindcss-animate')],
} satisfies Config
