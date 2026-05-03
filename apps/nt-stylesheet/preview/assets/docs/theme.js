const themeButton = document.getElementById('theme-toggle')
const themeIcon = themeButton?.querySelector('.nti')
const themeStyle = document.getElementById('nt-theme-style')

themeButton?.addEventListener('click', () => {
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
