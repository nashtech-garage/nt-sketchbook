# nt-stylesheet

## Overview

**nt-stylesheet** is a lightweight, customizable CSS framework designed to simplify the process of styling your web projects. It leverages the power of Tailwind CSS to provide a robust set of utility classes, enabling you to build responsive and modern UIs with ease.

## Features

-   Simple to use
-   Customizable with utility classes
-   Lightweight and fast
-   Responsive design support
-   Integration with Tailwind CSS

## Installation

You can install **nt-stylesheet** via npm or pnpm.

### Using npm

```sh
npm install nt-stylesheet
```

### Usage

You can customize nt-stylesheet by editing the `tailwind.config.js` file. Add your own styles or override existing ones to fit your design needs.

```css
@import 'nt-stylesheet/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
/** @type {import('tailwindcss').Config} */
const ntTheme = require('nt-stylesheet/dist/theme.cjs')

module.exports = {
    content: ['*.{html,js}'],
    theme: {
        extend: ntTheme.theme.extend,
    },
    plugins: [],
}
```

### Acknowledgements

`nt-stylesheet` is built upon the powerful Tailwind CSS framework, making it easy to use and customize. We extend our gratitude to the Tailwind CSS community for their continuous support and contributions.
