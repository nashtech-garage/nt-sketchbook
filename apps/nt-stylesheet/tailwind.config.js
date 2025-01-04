/** @type {import('tailwindcss').Config} */
const ntTheme = require('./themes').default;

module.exports = {
    content: ['./styles/**/*.scss', './themes/**/*.ts', './index.html'],
    theme: {
        extend: ntTheme.extend,
    },
    plugins: [],
};
