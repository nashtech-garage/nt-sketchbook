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
npx nt-stylesheet
```

### Usage

1. **Include the Stylesheet**

Add the following line to your HTML file to include the `nt-stylesheet` theme:

```html
<link
    rel="stylesheet"
    href="node_modules/nt-stylesheet/dist/nt-stylesheet.css"
/>
```

2. **Import Theme File to Tailwind Config**

Create or update your tailwind.config.js file to include the nt-stylesheet theme:

```js
/** @type {import('tailwindcss').Config} */
const ntTheme = require('nt-stylesheet/dist/nt-stylesheet.cjs')

module.exports = {
    content: ['*.{html,js}'],
    theme: {
        extend: ntTheme.extend,
    },
    plugins: [],
}
```

3. **Execute Your Styles**

Run the following command to generate your CSS file:

```bash
npx tailwindcss -i ./input.css -o ./dist/output.css --watch
```

### Acknowledgements

`nt-stylesheet` is built upon the powerful Tailwind CSS framework, making it easy to use and customize.
