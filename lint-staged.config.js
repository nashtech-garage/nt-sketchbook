module.exports = {
    '{apps}/**/*.{ts,tsx}': (files) => {
        return `node nx-affected-relative-paths.js --target=typecheck --files=${files.join(
            ',',
        )}`
    },
    '{apps}/**/*.{js,ts,jsx,tsx,json,css,scss,md}': (files) => {
        return [
            `prettier --write ${files.join(' ')}`,
            `node nx-affected-relative-paths.js --target=lint --files=${files.join(
                ',',
            )}`,
            `nx format:write --files=${files.join(',')}`,
        ]
    },
}
