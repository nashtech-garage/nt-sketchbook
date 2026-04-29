const themeButton = document.getElementById('theme-toggle')
const themeIcon = themeButton.querySelector('.nti')
const themeStyle = document.getElementById('nt-theme-style')
const stylesContent = document.getElementById('styles-content')

const styleSections = [
    'hero',
    'usage',
    'border',
    'animation',
    'flex',
    'grid',
    'size',
    'spacing',
    'text',
    'typography',
    'utilities',
    'sass',
    'footer'
]

const loadStyleDocs = async () => {
    if (!stylesContent) return

    try {
        const sections = await Promise.all(
            styleSections.map((section) =>
                fetch(`styles/sections/${section}.html`).then(
                    (response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Failed to load ${section}`
                            )
                        }

                        return response.text()
                    }
                )
            )
        )

        stylesContent.innerHTML = sections.join('\n')

        const targetId = decodeURIComponent(
            window.location.hash.replace('#', '')
        )
        if (targetId) {
            document.getElementById(targetId)?.scrollIntoView()
        }
    } catch {
        stylesContent.innerHTML =
            '<section class="docs-section"><p>Style documentation could not be loaded.</p></section>'
    }
}

themeButton.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'nt-theme-dark'
    const nextTheme = isDark ? 'nt-theme-light' : 'nt-theme-dark'

    document.body.dataset.theme = nextTheme
    themeStyle.href = `../themes/${nextTheme}.css`
    themeIcon.className = isDark ? 'nti nti-moon' : 'nti nti-sun'
    themeButton.setAttribute(
        'aria-label',
        isDark ? 'Toggle dark theme' : 'Toggle light theme'
    )
})

loadStyleDocs()
