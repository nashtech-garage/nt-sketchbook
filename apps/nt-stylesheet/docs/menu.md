# Menu Component

The Menu component provides grouped navigation and command menus for product surfaces. It supports sections, icons, active states, descriptions, keyboard hints, nested submenus, badges, search lists, and sidebar navigation.

## Usage

```html
<nav class="nt-menu" aria-label="Main menu">
    <section class="nt-menu-section">
        <h2 class="nt-menu-title">Group Title</h2>
        <ul class="nt-menu-list">
            <li>
                <a class="nt-menu-item" href="#">
                    <i class="nti nti-user nt-menu-icon"></i>
                    <span class="nt-menu-label">Profile</span>
                </a>
            </li>
            <li>
                <a class="nt-menu-item is-active" href="#">
                    <i class="nti nti-palette nt-menu-icon"></i>
                    <span class="nt-menu-label">Themes</span>
                    <i class="nti nti-chevron-right nt-menu-chevron"></i>
                </a>
            </li>
        </ul>
    </section>
</nav>
```

## Classes

-   `.nt-menu` creates the surface.
-   `.nt-menu-section`, `.nt-menu-title`, and `.nt-menu-list` group menu items.
-   `.nt-menu-item` styles anchors or buttons as menu rows.
-   `.is-active` marks the selected row.
-   `.is-danger` styles destructive actions.
-   `.nt-menu-submenu` positions a child menu to the right of a parent item.
-   `.nt-menu-select`, `.nt-menu-search`, `.nt-menu-sidebar`, and `.nt-menu-compact` provide common variants.

[Back to docs index](README.md)
