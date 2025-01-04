const path = require('path')
const { execSync } = require('child_process')

const args = process.argv.slice(2)
const filesArgIndex = args.findIndex((arg) =>
    arg.startsWith('--files='),
)

if (filesArgIndex !== -1) {
    const filesArg = args[filesArgIndex]
    const absolutePaths = filesArg.replace('--files=', '').split(',')
    const relativePaths = absolutePaths.map((file) =>
        path.relative(process.cwd(), file),
    )
    args[filesArgIndex] = `--files=${relativePaths.join(',')}`
}

const command = `nx affected ${args.join(' ')}`
execSync(command, { stdio: 'inherit' })
