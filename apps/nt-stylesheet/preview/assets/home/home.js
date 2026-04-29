const componentGrid = document.getElementById('component-grid')
const versionLabel = document.getElementById('package-version')
const themeButton = document.getElementById('theme-toggle')
const themeIcon = themeButton.querySelector('.nti')
const themeStyle = document.getElementById('nt-theme-style')
const copyButton = document.getElementById('copy-install')
const installCommand =
    document.getElementById('install-command').textContent

const descriptions = {
    alert: 'Contextual feedback messages',
    avatar: 'User images and presence states',
    badge: 'Compact labels and statuses',
    breadcrumb: 'Page hierarchy navigation',
    button: 'Actions, variants, and sizes',
    card: 'Flexible content containers',
    checkbox: 'Binary selection controls',
    collapse: 'Expandable content regions',
    combobox: 'Searchable option picking',
    'date-picker': 'Calendar-based date input',
    dropdown: 'Menus and contextual actions',
    'input-group': 'Grouped form controls',
    inputs: 'Text fields and form inputs',
    label: 'Form and metadata labels',
    modal: 'Focused dialog experiences',
    multiselect: 'Multiple option selection',
    pagination: 'Paged data navigation',
    popover: 'Rich floating content',
    progress: 'Completion and loading states',
    'radio-group': 'Single-choice groups',
    select: 'Native select styling',
    switch: 'On and off toggles',
    table: 'Structured data display',
    tooltip: 'Small contextual hints'
}

const iconByComponent = {
    alert: 'nti-triangle-alert',
    avatar: 'nti-user-round',
    badge: 'nti-badge',
    breadcrumb: 'nti-route',
    button: 'nti-square-mouse-pointer',
    card: 'nti-panels-top-left',
    checkbox: 'nti-square-check',
    collapse: 'nti-chevrons-up-down',
    combobox: 'nti-list-filter',
    'date-picker': 'nti-calendar-days',
    dropdown: 'nti-menu',
    'input-group': 'nti-panels-left-bottom',
    inputs: 'nti-text-cursor-input',
    label: 'nti-tag',
    modal: 'nti-panels-top-left',
    multiselect: 'nti-list-checks',
    pagination: 'nti-ellipsis',
    popover: 'nti-message-square-more',
    progress: 'nti-chart-no-axes-column',
    'radio-group': 'nti-circle-dot',
    select: 'nti-list',
    switch: 'nti-toggle-right',
    table: 'nti-table',
    tooltip: 'nti-message-circle-question'
}

const renderComponents = (components) => {
    componentGrid.innerHTML = components
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((component) => {
            const description =
                descriptions[component.id] ||
                'Open the generated example'
            const icon = iconByComponent[component.id] || 'nti-box'

            return `
                <a class="docs-component-link" href="examples/view.html?component=${component.id}">
                    <span>
                        <strong>${component.name}</strong>
                        <span>${description}</span>
                    </span>
                    <i class="nti ${icon}" aria-hidden="true"></i>
                </a>
            `
        })
        .join('')
}

fetch('components-manifest.json')
    .then((response) => response.json())
    .then((data) => renderComponents(data.components || []))
    .catch(() => {
        componentGrid.innerHTML =
            '<p>Component manifest could not be loaded.</p>'
    })

fetch('package.json')
    .then((response) => response.json())
    .then((data) => {
        versionLabel.textContent = `Currently v${data.version}`
    })
    .catch(() => {
        versionLabel.textContent = 'Version unavailable'
    })

themeButton.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'nt-theme-dark'
    const nextTheme = isDark ? 'nt-theme-light' : 'nt-theme-dark'

    document.body.dataset.theme = nextTheme
    themeStyle.href = `themes/${nextTheme}.css`
    themeIcon.className = isDark ? 'nti nti-moon' : 'nti nti-sun'
    themeButton.setAttribute(
        'aria-label',
        isDark ? 'Toggle dark theme' : 'Toggle light theme'
    )
})

copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(installCommand)
        copyButton.textContent = 'Copied'
    } catch {
        copyButton.textContent = 'Copy failed'
    }

    window.setTimeout(() => {
        copyButton.textContent = 'Copy'
    }, 1800)
})
