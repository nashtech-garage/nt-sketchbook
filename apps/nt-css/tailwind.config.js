/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./dist/*.{js,jsx,ts,tsx,html}'],
    presets: [require('./themes')],
    plugins: [],
}
