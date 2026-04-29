const params = new URLSearchParams(window.location.search)
const selectedComponent = params.get('component') || 'button'
const frame = document.getElementById('example-frame')
const code = document.getElementById('example-code')
const copyCode = document.getElementById('copy-code')
const title = document.getElementById('example-title')
const select = document.getElementById('component-select')
const themeButton = document.getElementById('theme-toggle')
const themeIcon = themeButton.querySelector('.nti')
const themeStyle = document.getElementById('nt-theme-style')

const formatName = (id) =>
    id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

const formatMarkup = (html) =>
    html
        .replace(/></g, '>\n<')
        .replace(/\n\s*\n/g, '\n')
        .trim()

const runScripts = (doc, componentId) => {
    doc.querySelectorAll('script').forEach((script) => {
        const scriptText = script.textContent || ''
        const nextScript = document.createElement('script')
        const src = script.getAttribute('src')

        if (
            src === '../scripts/nt.js' ||
            src === '../assets/examples/direct.js' ||
            scriptText.includes("document.querySelector('.nt-page')")
        ) {
            return
        }

        if (src) {
            nextScript.src = new URL(
                src.replace(/^\.\//, ''),
                `${window.location.origin}/examples/${componentId}/`
            ).toString()
        } else {
            nextScript.textContent = script.textContent
        }

        document.body.appendChild(nextScript)
    })
}

const loadExample = async (componentId) => {
    title.textContent = formatName(componentId)
    frame.innerHTML =
        '<p class="example-empty">Loading example...</p>'
    code.textContent = 'Loading code...'

    try {
        const response = await fetch(`${componentId}.html`)

        if (!response.ok) {
            throw new Error(`Could not load ${componentId}.html`)
        }

        const text = await response.text()
        const doc = new DOMParser().parseFromString(text, 'text/html')
        const page = doc.querySelector('.nt-page') || doc.body
        const markup = formatMarkup(page.outerHTML)

        frame.innerHTML = ''
        frame.appendChild(page.cloneNode(true))
        code.textContent = markup
        runScripts(doc, componentId)
    } catch (error) {
        frame.innerHTML = `<p class="example-empty">${error.message}</p>`
        code.textContent = error.message
    }
}

const loadManifest = async () => {
    const response = await fetch('../components-manifest.json')
    const data = await response.json()
    const components = [...(data.components || [])].sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    select.innerHTML = components
        .map(
            (component) =>
                `<option value="${component.id}">${component.name}</option>`
        )
        .join('')

    select.value = selectedComponent
}

select.addEventListener('change', () => {
    const componentId = select.value
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.set('component', componentId)
    history.replaceState(null, '', nextUrl)
    loadExample(componentId)
})

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

copyCode.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(code.textContent)
        copyCode.textContent = 'Copied'
    } catch {
        copyCode.textContent = 'Copy failed'
    }

    window.setTimeout(() => {
        copyCode.textContent = 'Copy'
    }, 1600)
})

loadManifest().finally(() => loadExample(selectedComponent))
