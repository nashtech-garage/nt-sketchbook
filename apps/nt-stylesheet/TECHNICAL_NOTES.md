# NT Stylesheet Technical Notes

## Scope

This note covers the implementation in `apps/nt-stylesheet`. The package is a Vite-built stylesheet and DOM enhancement library for NT design system components.

## Technical Notes

- The published package metadata is defined in `package.json` as `@nashtech-garage/stylesheet`, while README and component docs often refer to `@nashtech-garage/nt-stylesheet`. This creates install/import ambiguity.
- The CSS build uses `vite.config.ts` and `vite.common.ts` to create multiple Rollup inputs: `nt` styles, icon styles, JavaScript enhancements, Tailwind integration, themes, and branding bundles.
- The canonical stylesheet entry is `src/styles/index.scss`, which delegates to the existing `src/styles/_site.scss` bundle entry for backward compatibility.
- Design tokens are split into primitive, semantic, and component contracts under `src/styles/tokens`, then emitted into `:root` through `src/styles/_variables.scss` and into theme scopes through `src/styles/themes/*`.
- Theme and brand source files now live under `src/styles/themes` and `src/styles/brands`; previous `src/themes` and `src/branding` paths remain as compatibility shims.
- Tailwind integration is implemented as a JavaScript theme export in `src/integrations/tailwind/index.ts`, backed by token-like maps in `src/integrations/tailwind/themes/*`.
- JavaScript components are auto-initialized by `src/scripts/index.ts`. Components use data attributes and document-level event delegation rather than framework-specific APIs.
- `Singleton` provides a shared base for once-only initialization, but several components bypass or override that contract. `NtModal.init()` and `NtMultiSelect.init()` attach listeners/observers directly, so repeated init calls can duplicate side effects.
- Interactive components mostly manipulate classes and inline styles directly. Dropdowns, modals, popovers, tooltips, comboboxes, multi-selects, collapses, and date pickers are implemented as progressive DOM enhancements.
- Component SCSS files now define local CSS custom property contracts near the top-level component selector, then consume those variables for key colors, radii, spacing, transitions, and surface values.
- Component token contracts use semantic token fallbacks, so themes and brands can override behavior through semantic variables while consumers can still override a single component locally.
- Tooltip and popover support HTML content and sanitize it with `sanitize-html`, which is a good security boundary for attribute-provided HTML.
- Positioning is centralized for tooltip/popover in `src/utils/positioning.ts`, but combobox and date picker calculate positions separately. There is no viewport collision handling or scroll/resize reposition strategy for most floating UI.
- The date picker is the most complex component. It is split into state, generator, renderer, panel, and utility modules, with unit tests around each layer.
- The date picker generator has a likely bug in previous-month date creation: `state.currentMonth - CellMonthPosition.PREVIOUS` adds 1 because `PREVIOUS` is `-1`, so previous-month filler cells can be assigned next-month dates.
- Current tests do not catch the date picker previous-month date bug because they assert `outside` and grid shape, but not the actual `Date` month for previous filler cells.
- The docs folder is component-oriented and includes examples, but import paths are inconsistent. Some docs reference `dist/nt-stylesheet.css`, others reference `dist/nt.css`, and package exports expose `./css/nt.css`.
- `STRUCTURE.md` is stale. It references folders and filenames that no longer match the current implementation, such as `/js`, `main.scss`, and `_variables.scss.scss`.
- Build-time manifest generation writes `dist/theme-manifest.json` inside `makeInputs()`. Because this is done while computing Rollup inputs, a config read has a filesystem side effect.
- Brand CSS now exposes `[data-brand='nashtech']` identity tokens separately from theme CSS, so consumers can combine attributes such as `data-theme='nt-theme-dark'` and `data-brand='nashtech'`.

## Verification Notes

- `pnpm --filter @nashtech-garage/stylesheet test -- --run` currently fails before collecting tests because `vitest-canvas-mock` cannot be resolved from root `setup-test.ts`.
- `pnpm --filter @nashtech-garage/stylesheet typecheck` currently fails with unresolved modules including `date-fns`, `@testing-library/dom`, `sanitize-html`, and `rollup`.
- `pnpm --filter @nashtech-garage/stylesheet build` currently fails for the same unresolved TypeScript dependencies and because `postcss-preset-env` cannot be resolved.
- Direct Sass compilation succeeds for `src/styles/themes/nt-theme-light.scss`, `src/styles/themes/nt-theme-dark.scss`, and `src/styles/brands/nashtech.scss`.
- Direct Sass compilation of `src/styles/index.scss` is blocked by unresolved `react-datepicker/dist/react-datepicker.css`.
- Because tests and typecheck are blocked by dependency resolution, implementation findings are based on static inspection plus the failed verification output.

## Improvement Task List

- [ ] Align package naming across `package.json`, README, component docs, CDN snippets, and import examples.
- [ ] Align package exports with the documented public API, including CSS paths, JavaScript bundle paths, and Tailwind integration paths.
- [ ] Fix dependency resolution for local verification, especially `vitest-canvas-mock`, `date-fns`, `@testing-library/dom`, `sanitize-html`, and `rollup`.
- [ ] Fix the date picker previous-month date calculation in `src/scripts/nt-date-picker/nt-date-picker-generator.ts`.
- [ ] Add date picker tests that assert actual `Date` month/year values for previous-month and next-month filler cells.
- [ ] Normalize component initialization so every interactive component is idempotent when `init()` is called more than once.
- [ ] Add teardown or listener management for document-level event handlers to make tests isolated and support SPA lifecycle usage.
- [ ] Consolidate floating element positioning behind one utility and add viewport collision handling for tooltip, popover, combobox, dropdown, and date picker.
- [ ] Improve modal accessibility with focus trapping, focus return, `aria-modal`, dialog labeling, and inert/background interaction handling.
- [ ] Improve combobox and multi-select keyboard support with arrow navigation, active descendant state, Enter selection, Escape close, and ARIA roles.
- [ ] Replace string-based date picker rendering with DOM construction or a constrained template layer that escapes dynamic values by default.
- [ ] Move theme manifest writing out of `makeInputs()` so build input discovery is pure and easier to test.
- [ ] Generate Tailwind theme values from the same source tokens used by Sass to avoid drift between `tokens/_tokens.scss` and `integrations/tailwind/themes/*`.
- [ ] Update `STRUCTURE.md` so it reflects current folders, entrypoints, build outputs, and docs.
- [ ] Add a small public API contract document that defines supported data attributes, classes, events, and import paths for each component.
- [ ] Add build smoke tests that verify expected files exist in `dist`, including CSS, scripts, theme files, branding files, docs, examples, and manifest.
- [ ] Add visual or DOM integration tests for representative examples so style and script changes are caught together.
