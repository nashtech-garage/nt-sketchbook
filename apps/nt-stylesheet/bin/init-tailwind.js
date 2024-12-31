#!/usr/bin/env node

import fs from 'fs'
import { exec } from 'child_process'
import readline from 'readline'

export const installPackage = (packageName) => {
    return new Promise((resolve, reject) => {
        exec(`npm install ${packageName}`, (error) => {
            if (error) {
                console.error(
                    `Error installing ${packageName}: ${error.message}`,
                )
                reject(error)
                return
            }
            console.log(`${packageName} installed successfully!`)
            resolve()
        })
    })
}

export const createTailwindConfig = () => {
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
const ntTheme = require('@nashtech/nt-stylesheet/dist/theme.cjs');
module.exports = {
    content: ['*.{html,js}'],
    theme: {
        extend: ntTheme.extend,
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

export const createPostCSSConfig = () => {
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

export const initialize = async () => {
    try {
        await installPackage('@nashtech/nt-stylesheet')
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
                    console.log(
                        'Tailwind CSS initialization skipped.',
                    )
                }
                rl.close()
            },
        )
    } catch (error) {
        console.error('Initialization failed:', error)
    }
}

initialize()
