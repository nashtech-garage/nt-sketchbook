/* eslint-disable @typescript-eslint/no-require-imports */
import { ntTheme } from '@nashtech/stylesheet/tailwind'
import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './stories/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: ntTheme.extend,
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config
