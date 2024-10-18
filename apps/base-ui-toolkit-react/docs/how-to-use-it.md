# How to Use the UI Library

This document provides step-by-step instructions on how to build the UI library package, upload it to Azure, and install it in your project.

## Step 1: Build the Package

**Build the package**:

```bash
 pnpm run build:lib
```

The built package will be located in the `dist` directory.

## Step 2: Upload to Azure

To upload the built package to Azure, follow these steps:

Checkout this [pipeline](https://dev.azure.com/evolutionwellness/Global%20Codebase/_build?definitionId=291) you need to run this package to publish to artifact

Your package will display in [here](https://dev.azure.com/evolutionwellness/Global%20Codebase/_artifacts/feed/core-components) name `circuit-ui`

## Step 3: Add the package to your project

Following this [step](https://dev.azure.com/evolutionwellness/Global%20Codebase/_artifacts/feed/core-components/connect)

## Conclusion

By following these steps, you can build your UI library package, upload it to Azure, and install it in any project. This process ensures that your UI components are reusable and easily accessible across multiple projects.
