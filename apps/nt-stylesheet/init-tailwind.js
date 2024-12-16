import fs from 'fs'
import { exec } from 'child_process'
import readline from 'readline'
const isNotDevEnvironment =
    !process.env.INIT_CWD || process.env.INIT_CWD !== process.cwd()

const createTailwindConfig = (rl) => {
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
                rl.close()
                return
            }
            console.log(
                'tailwind.config.js has been initialized and customized successfully!',
            )
            rl.close()
        },
    )
}

const createPostCSSConfig = (rl) => {
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
                rl.close()
                return
            }
            console.log(
                'postcss.config.js has been created successfully!',
            )
            rl.close()
        },
    )
}

if (isNotDevEnvironment) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question(
        'Do you want to initialize Tailwind CSS? (y/n) ',
        (answer) => {
            if (answer.toLowerCase() === 'y') {
                exec('npx tailwindcss init', (error, _, stderr) => {
                    if (error) {
                        console.error(
                            `Error initializing Tailwind CSS: ${error.message}`,
                        )
                        rl.close()
                        return
                    }
                    if (stderr) {
                        console.error(
                            `Error initializing Tailwind CSS: ${stderr}`,
                        )
                        rl.close()
                        return
                    }

                    createTailwindConfig(rl)
                    createPostCSSConfig(rl)
                })
            } else {
                console.log('Tailwind CSS initialization skipped.')
                rl.close()
            }
        },
    )
} else {
    console.log(
        'Development environment detected, skipping Tailwind CSS initialization.',
    )
}
