const searchInput = document.getElementById('icon-search')
const sizeFilter = document.getElementById('size-filter')
const grid = document.getElementById('icons-grid')
const iconCount = document.getElementById('icon-count')
const copyStatus = document.getElementById('copy-status')

let icons = []
const ALLOWED_ICON_SIZES = new Set([
    '',
    'nti-xs',
    'nti-sm',
    'nti-lg',
    'nti-xl',
    'nti-2x',
    'nti-3x',
    'nti-4x',
    'nti-5x'
])

const normalizeTag = (value) =>
    value.toLowerCase().replace(/\s+/g, '-')

const sanitizeSize = (value) =>
    ALLOWED_ICON_SIZES.has(value) ? value : ''

const setCopyStatus = (text) => {
    copyStatus.textContent = text
}

const copyClassName = async (className) => {
    try {
        await navigator.clipboard.writeText(className)
        setCopyStatus(`Copied ${className}`)
    } catch {
        setCopyStatus('Copy failed')
    }

    window.setTimeout(
        () => setCopyStatus('Click an icon to copy'),
        1800
    )
}

const iconCardTemplate = (icon, size) => {
    const className = `nti nti-${icon.name}`

    return `
        <button
            class="icon-card"
            type="button"
            data-class="${className}"
            title="Copy ${className}"
        >
            <span class="icon-preview">
                <i class="${className} ${size}" aria-hidden="true"></i>
            </span>
            <span class="icon-name">${icon.name}</span>
            <span class="icon-class">${className}</span>
        </button>
    `
}

const render = () => {
    const term = searchInput.value.toLowerCase().trim()
    const size = sanitizeSize(sizeFilter.value)
    const filtered = icons.filter(
        (icon) =>
            icon.name.includes(term) ||
            icon.tags.some((tag) => tag.includes(term))
    )

    iconCount.textContent = `${filtered.length} of ${icons.length} icons`

    if (!filtered.length) {
        grid.innerHTML = '<p class="icons-empty">No icons found.</p>'
        return
    }

    grid.innerHTML = filtered
        .map((icon) => iconCardTemplate(icon, size))
        .join('')
}

const loadIcons = async () => {
    const response = await fetch(
        '../assets/icons/icon-categories.json'
    )
    const data = await response.json()

    icons = Object.entries(data)
        .map(([name, tags]) => ({
            name,
            tags: tags.map((tag) => normalizeTag(tag))
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    render()
}

grid.addEventListener('click', (event) => {
    const card = event.target.closest('.icon-card')

    if (card) {
        copyClassName(card.dataset.class)
    }
})

searchInput.addEventListener('input', render)
sizeFilter.addEventListener('change', render)

loadIcons().catch(() => {
    iconCount.textContent = 'Icon manifest could not be loaded'
    grid.innerHTML =
        '<p class="icons-empty">Unable to load icons.</p>'
})
