/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./themes/**/*.{html,js,ts,jsx,tsx,scss}'],
    presets: [require('./themes')],
    plugins: [],
}
