# NT Sketchbook How-Tos

This document provides step-by-step guides for common tasks when using the NT Sketchbook.
Refer back to the [project README](README.md) for an overview and to the component docs under [apps/nt-stylesheet/docs](apps/nt-stylesheet/docs/README.md) for usage examples.

## Table of Contents

-   [Start](#Start)
-   [How to Add A New Component](#how-to-add-a-new-component)

---

## Start

-   Prerequisites:
    -   Node.js >= 20
    -   PNPM: 10.10.7.0

### Step 1: Install

-   `git clone https://github.com/nashtech-garage/nt-sketchbook.git`
-   `pnpm install`

### Step 2: Starting applications

The repository is a monorepo build with Nx, each project has its own documentations for starting, check for detailed at

-   [Stylesheet](apps/nt-stylesheet/README.md)
-   [UI Library](apps/nt-headless-ui/README.md)

## How to Add A New Component

### Step 1: Extract the Component CSS from Figma

-   Open the Figma file for the component you want to extract, ask designers to provide the Figma file link.
-   Extract the styling information into `apps/nt-stylesheet/src/styles/components` directory.
-   Name the file according to the component name (e.g., `_nt-button.scss`).
-   Create a new markdown file for the component (e.g., `Button.md`).

### Step 2: Create the Component

-   Build your React or Vue component inside `apps/nt-headless-ui` and import the new stylesheet file.
-   Follow the existing folder structure to keep components organized.

### Step 3: Document the Component

-   Add stories under `apps/nt-headless-ui` so the component appears in Storybook.
-   Update or create the corresponding Markdown file in `apps/nt-stylesheet/docs` with usage examples.
