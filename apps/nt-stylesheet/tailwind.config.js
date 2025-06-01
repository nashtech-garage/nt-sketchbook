/** @type {import('tailwindcss').Config} */
const { ntTheme } = require('./src/integrations/tailwind/index.ts')

module.exports = {
    content: [
        './styles/**/*.scss',
        './themes/**/*.ts',
        './themes/**/*.scss',
        './index.html',
    ],
    theme: {
        extend: ntTheme.extend,
    },
    plugins: [],
}
