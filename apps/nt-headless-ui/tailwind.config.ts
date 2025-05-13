/* eslint-disable @typescript-eslint/no-require-imports */
import { ntTheme } from '@nashtech/stylesheet/integrations/tailwind'
import type { Config } from 'tailwindcss'

const config: Config = {
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
}

export default config
