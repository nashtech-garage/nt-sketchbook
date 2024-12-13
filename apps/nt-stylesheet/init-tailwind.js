import fs from 'fs'
import { exec } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question(
    'Do you want to initialize Tailwind CSS? (y/n) ',
    (answer) => {
        if (answer.toLowerCase() === 'y') {
            exec('npx tailwindcss init', (error, stdout, stderr) => {
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

                const tailwindConfigContent = `
                    /** @type {import('tailwindcss').Config} */
                    const ntTheme = require('nt-stylesheet/dist/theme').default;

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
            })
        } else {
            console.log('Tailwind CSS initialization skipped.')
            rl.close()
        }
    },
)
