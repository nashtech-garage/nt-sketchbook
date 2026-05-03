type AssetCopy = {
    glob: string
    input: string
    output: string
}

export function assetCopies() {
    const copies: AssetCopy[] = [
        { input: './docs', output: 'docs', glob: '**/*' },
        {
            input: './src/fonts',
            output: 'assets/fonts',
            glob: '**/*'
        },
        { input: '.', output: '', glob: 'components-manifest.json' }
    ]

    return copies
}
