/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ['main', { name: 'beta', prerelease: true }],
    repositoryUrl: 'https://github.com/nashtech-garage/nt-sketchbook',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                pkgRoot: 'apps/nt-stylesheet',
            },
        ],
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                assets: [
                    'apps/nt-stylesheet/package.json',
                    'apps/nt-stylesheet/CHANGELOG.md',
                ],
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
}
