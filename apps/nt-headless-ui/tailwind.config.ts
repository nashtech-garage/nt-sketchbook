import { ntTheme } from '@stylesheet/dist/integrations/tailwind/index.cjs'
import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: [
        '@stylesheet/dist/**/*.css',
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
