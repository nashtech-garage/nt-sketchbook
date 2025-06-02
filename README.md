# **NT Sketchbook**

Also known as the NashTech Design Ecosystem

Welcome to NT Sketchbook, a repository designed to empower designers and developers to bring their creative visions to life with ease and efficiency.

## Table of Contents

- [Overview](#Overview)
- [Installation](#Installation)
- [Storybook](#Storybook)
- [Contributing](#Contributing)
- [License](#License)

## Overview

NT Sketchbook is your ultimate tool for application development. We provide:

-   CSS framework delivered with NashTech Design Style Guides as the default theme (nt-theme).
-   UI Components: Basic components include buttons, labels, inputs, etc.
-   CLI: Utilities for application scaffolding and component management.

## Installation

Getting started with NT Sketchbook is simple and straightforward:

1. **Install node, nx, pnpm**

-   Install Node

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

-   Install pnpm

```bash
npm install -g pnpm
pnpm --version
```

-   Install nx

```bash
pnpm add -g nx
nx --version

```

2. **Clone the Repository:**
```bash
https://github.com/nashtech-garage/nt-sketchbook
```
3. **Navigate to the Project Directory:**
```bash
cd nt-sketchbook
```
4. **Install Essential Dependencies:**
```bash
pnpm bootstrap
```

## Storybook

1. **Build stylesheet and headlessui**

    ```bash
     pnpm run build:headlessui-storybook
     pnpm run  build:headlessui-lib
     pnpm run  build:stylesheet:lib
     pnpm run  build:stylesheet-preview
    ```

2. Run storybook

```bash
nx run nt-headless-ui:storybook
```

Then, open your favorite web browser and navigate to ` http://localhost:56053/` to immerse yourself in the NT Sketchbook experience.

## Contributing

Join our vibrant community of creators! Your contributions can make a significant impact. Here’s how to get involved:

1. **Fork the Repository.**
2. **Create Your Feature Branch:**
    ```bash
    git checkout -b feature/YourFeature
    ```
3. **Commit Your Changes:**

    ```bash
    git commit -m "Add a compelling new feature"
    ```

4. **Push to the Branch:**
    ```bash
    git push origin feature/YourFeature
    ```
5. **Open a Pull Request.**

## License

This project is proudly licensed under the MIT License. For more details, see the [LICENSE](LICENSE.md) file.
