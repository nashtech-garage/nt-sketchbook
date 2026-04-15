# NT Stylesheet Structure

```text
apps/nt-stylesheet
|-- src
|   |-- styles
|   |   |-- index.scss                # Canonical style entrypoint
|   |   |-- _site.scss                # Backward-compatible main CSS bundle entry
|   |   |-- _variables.scss           # Sass variable bridge backed by CSS tokens
|   |   |-- tokens
|   |   |   |-- _index.scss           # Token API and composed token mixin
|   |   |   |-- _primitives.scss      # Raw color, spacing, type, radius tokens
|   |   |   |-- _semantic.scss        # Product meaning aliases
|   |   |   |-- _component.scss       # Component-level token contracts
|   |   |   |-- _variants.scss        # Shared Sass maps for component variants
|   |   |   |-- _tokens.scss          # Compatibility forwarder
|   |   |-- themes
|   |   |   |-- _index.scss
|   |   |   |-- nt-theme-light.scss
|   |   |   |-- nt-theme-dark.scss
|   |   |-- brands
|   |   |   |-- _index.scss
|   |   |   |-- nashtech.scss
|   |   |-- components
|   |   |-- layouts
|   |   |-- functions
|   |-- themes                      # Compatibility shims for previous theme paths
|   |-- branding                    # Compatibility shims for previous brand paths
|   |-- scripts                     # Progressive DOM enhancement scripts
|   |-- integrations                # Tailwind and other integration APIs
|-- docs
|-- examples
|-- public
|-- dist
```

## Style Layering

```text
primitive tokens -> semantic tokens -> component tokens -> themes/brands -> components/utilities
```

- Primitive tokens hold raw values such as colors, spacing, font weights, and radii.
- Semantic tokens map raw values to product roles such as body background, primary text, action color, and border color.
- Component tokens define stable override contracts such as button background, control border, and surface radius.
- Themes override semantic and component tokens for environment modes such as light and dark.
- Brands override identity tokens such as brand primary, brand secondary, action color, and font family.

## Build Outputs

The Vite build scans canonical files under `src/styles/themes` and `src/styles/brands`.

```text
dist/css/nt.css
dist/css/nt-icons.css
dist/themes/nt-theme-light.css
dist/themes/nt-theme-dark.css
dist/brands/nashtech.css
dist/integrations/tailwind/index.js
```
