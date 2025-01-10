module.exports = {
    '**/*.{js,ts,jsx,tsx,json,css,scss,md}': (files) => {
        return [
            `prettier --write ${files
                .map((file) => `"${file}"`)
                .join(' ')}`,
            `pnpm eslint --fix ${files
                .map((file) => `"${file}"`)
                .join(' ')}`,
        ]
    },
}
