/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: ['class', '[data-mode="dark"]'],
    presets: [require('./theme.ts')],
    plugins: [],
}
