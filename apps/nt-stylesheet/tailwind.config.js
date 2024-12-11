/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './styles/**/*.{scss}',
        './themes/**/*.{html,js,jsx,ts,tsx,scss}',
    ],
    presets: [require('./themes')],
    plugins: [],
}
