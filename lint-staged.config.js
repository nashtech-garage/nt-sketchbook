module.exports = {
    '**/*.{js,ts,jsx,tsx,json,css,scss,md}': (files) => {
        return [
            `prettier --write ${files
                .map((file) => `"${file}"`)
                .join(' ')}`,
            'pnpm run lint:pkg',
            'pnpm run typecheck',
            'nx lint nt-stylesheet --fix',
            'nx lint nt-headless-ui --fix'
        ]
    },
    'package.json': (files) => `npmPkgJsonLint ${files.join(' ')}`
}
