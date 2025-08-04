# Combobox Component

The **Combobox** component in NT Stylesheet provides customizable combobox component

## Features

-   Custom combobox component with passing props for trigger, popover, filter, select options in form controller
-   Easy to customize colors via CSS classes
-   Accessibility-friendly
-   Support for both controlled or uncontrolled component.
-   Reuseable component

## Installation

Import the stylesheet in your project:

```javascript
import '@nashtech-garage/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

Wrap your trigger component - in this case is <button> inside `<div class="nt-combobox">` to get popover content and combobox styling.

        <div class="nt-combobox">
            <button
                style="width: 180px"
                class="nt-combobox-trigger"
                onclick="toggleDropdown()"
            >
                Select an option
            </button>
            <div class="nt-combobox-popover">
                <input
                    class="nt-combobox-input"
                    type="text"
                    placeholder="Search options..."
                    onkeyup="filterFunction()"
                />
                <div class="nt-combobox-list">
                    <div
                        class="nt-combobox-list-item"
                        onclick="selectOption('About')"
                    >
                        About
                    </div>
                    <div
                        class="nt-combobox-list-item"
                        onclick="selectOption('Base')"
                    >
                        Base
                    </div>
                    <div
                        class="nt-combobox-list-item"
                        onclick="selectOption('Blog')"
                    >
                        Blog
                    </div>
                    <div
                        class="nt-combobox-list-item"
                        onclick="selectOption('Contact')"
                    >
                        Contact
                    </div>
                </div>
            </div>
        </div>

## Layouts

-   Use `.nt-combobox` for combobox style only

## Example Markup

```html
<main>
    <div class="nt-combobox">
        <button
            style="width: 180px"
            class="nt-combobox-trigger"
            onclick="toggleDropdown()"
        >
            Select an option
        </button>
        <div class="nt-combobox-popover">
            <input
                class="nt-combobox-input"
                type="text"
                placeholder="Search options..."
                onkeyup="filterFunction()"
            />
            <div class="nt-combobox-list">
                <div
                    class="nt-combobox-list-item"
                    onclick="selectOption('About')"
                >
                    About
                </div>
                <div
                    class="nt-combobox-list-item"
                    onclick="selectOption('Base')"
                >
                    Base
                </div>
                <div
                    class="nt-combobox-list-item"
                    onclick="selectOption('Blog')"
                >
                    Blog
                </div>
                <div
                    class="nt-combobox-list-item"
                    onclick="selectOption('Contact')"
                >
                    Contact
                </div>
            </div>
        </div>
    </div>
</main>
```

---

[Back to docs index](README.md)
