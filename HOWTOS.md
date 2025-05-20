# NT Sketchbook How-Tos

This document provides step-by-step guides for common tasks when using the NT Sketchbook

## Table of Contents

- [How to Add A New Component](#how-to-add-a-new-component)

---

## How to Add A New Component

### Step 1: Extract the Component CSS from Figma

- Open the Figma file for the component you want to extract, ask designers to provide the Figma file link.
- Extract the styling information into `apps/nt-stylesheet/src/styles/components` directory.
- Name the file according to the component name (e.g., `_nt-button.scss`).
- Create a new markdown file for the component (e.g., `Button.md`).

### Step 2: Create the Component that uses the CSS located in the `apps/nt-headless-ui` directory

### Step 3: Create the Component Stories in `apps/nt-headless-ui`
