module.exports = {
    '**/*.{js,ts,jsx,tsx,json,css,scss,md}': (files) => {
        return [
            `prettier --write ${files
                .map((file) => `"${file}"`)
                .join(' ')}`,
            `nx lint nt-headless-ui --fix`,
            `nx lint nt-stylesheet --fix`,
        ]
    },
}
