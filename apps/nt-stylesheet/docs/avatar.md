# Avatar Component

The **Avatar** component in NT Stylesheet is used to display user profile images with support for different sizes and online status indicators.

## Features

-   Circular avatar with `object-fit: cover`
-   Multiple sizes (`xs`, `sm`, `md`, `lg`)
-   Status indicators: online, offline, away, busy
-   Position-aware status placement per avatar size

## Installation

Import the stylesheet in your project:

```javascript
import '@nashtech/nt-stylesheet/dist/nt-stylesheet.css'
```

## Usage

### Avatar Sizes

Use the following size classes for avatars:

-   `nt-avatar-xs`
-   `nt-avatar-sm`
-   `nt-avatar-md`
-   `nt-avatar-lg`

Wrap the avatar in a size-specific wrapper to ensure correct status positioning:

```html
<div class="nt-avatar-wrapper-sm">
    <img src="user.jpg" alt="User" class="nt-avatar nt-avatar-sm" />
    <span class="nt-avatar-status nt-avatar-status--online"></span>
</div>
```

### Status Variants

Add one of the following modifiers to display user status:

-   `nt-avatar-status--online` Green dot
-   `nt-avatar-status--offline` Gray dot
-   `nt-avatar-status--away` Yellow dot
-   `nt-avatar-status--busy` Red dot

**_Example:_**

```html
<!-- Online -->
<span class="nt-avatar-status nt-avatar-status--online"></span>

<!-- Offline -->
<span class="nt-avatar-status nt-avatar-status--offline"></span>

<!-- Away -->
<span class="nt-avatar-status nt-avatar-status--away"></span>

<!-- Busy -->
<span class="nt-avatar-status nt-avatar-status--busy"></span>
```

---

[Back to docs index](README.md)
