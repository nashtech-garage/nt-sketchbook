const postcss = require('rollup-plugin-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
    input: './src/styles.scss',
    output: {
        file: './dist/styles.css',
        format: 'esm',
    },
    plugins: [
        postcss({
            extract: true,
            minimize: true,
            plugins: [tailwindcss(), autoprefixer()],
            use: ['sass'],
        }),
    ],
}
