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

To use nt-stylesheet in your project, include the generated `styles.css` file in the `<head>` section of your HTML file.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            href="node_modules/nt-stylesheet/dist/styles.css"
            rel="stylesheet"
        />
        <title>Example</title>
    </head>
    <body>
        <h1 class="text-3xl font-bold underline">
            Hello, nt-stylesheet!
        </h1>
    </body>
</html>
```

### Customization

You can customize nt-stylesheet by editing the `tailwind.config.js` file. Add your own styles or override existing ones to fit your design needs.

```css
@import 'nt-stylesheet/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                primary: '#ff6347',
                secondary: '#4b5563',
            },
        },
    },
    plugins: [],
}
```

### Acknowledgements

`nt-stylesheet` is built upon the powerful Tailwind CSS framework, making it easy to use and customize. We extend our gratitude to the Tailwind CSS community for their continuous support and contributions.
