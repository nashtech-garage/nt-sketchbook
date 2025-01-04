// lint-staged.config.js
module.exports = {
    '*.{js,ts,jsx,tsx,json,css,scss,md}': ['prettier --write'],
    '*.{js,ts,jsx,tsx}': ['eslint --fix'],
}
