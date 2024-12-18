#!/usr/bin/env node

import fs from 'fs'
import readline from 'readline'

const createTailwindConfig = () => {
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
const ntTheme = require('nt-stylesheet/dist/theme.cjs');
module.exports = {
    content: ['*.{html,js}'],
    theme: {
        extend: ntTheme.theme.extend,
    },
    plugins: [],
};
    `
    fs.writeFile(
        'tailwind.config.js',
        tailwindConfigContent,
        (writeError) => {
            if (writeError) {
                console.error(
                    `Error writing tailwind.config.js: ${writeError.message}`,
                )
                return
            }
            console.log(
                'tailwind.config.js has been initialized successfully!',
            )
        },
    )
}

const createPostCSSConfig = () => {
    const postcssConfigContent = `module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
    },
};
    `

    fs.writeFile(
        'postcss.config.js',
        postcssConfigContent,
        (writeError) => {
            if (writeError) {
                console.error(
                    `Error writing postcss.config.js: ${writeError.message}`,
                )
                return
            }
            console.log(
                'postcss.config.js has been created successfully!',
            )
        },
    )
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question(
    'Do you want to initialize Tailwind CSS? (y/n) ',
    (answer) => {
        if (answer.toLowerCase() === 'y') {
            createTailwindConfig()
            createPostCSSConfig()
        } else {
            console.log('Tailwind CSS initialization skipped.')
        }
        rl.close()
    },
)
