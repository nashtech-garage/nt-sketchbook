module.exports = {
    '**/*.{js,ts,jsx,tsx,json,css,scss,md}': (files) => {
        return [
            `prettier --write ${files.join(' ')}`,
            `pnpm eslint . --fix`,
        ]
    },
}
