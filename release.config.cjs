/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ['master', { name: 'beta', prerelease: true }],
}
