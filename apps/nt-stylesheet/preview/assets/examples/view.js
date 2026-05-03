const params = new URLSearchParams(window.location.search)
const selectedComponent = params.get('component') || 'button'
const frame = document.getElementById('example-frame')
const code = document.getElementById('example-code')
const copyCode = document.getElementById('copy-code')
const title = document.getElementById('example-title')
const select = document.getElementById('component-select')
const componentNav = document.getElementById('example-component-nav')
const examplesRoot =
    document.querySelector('[data-examples-path]')?.dataset
        .examplesPath || '.'

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

const runScripts = (doc, exampleUrl) => {
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
                exampleUrl
            ).toString()
        } else {
            nextScript.textContent = script.textContent
        }

        document.body.appendChild(nextScript)
    })
}

const loadExample = async (componentId) => {
    title.textContent = formatName(componentId)
    document
        .querySelectorAll('[data-component-link]')
        .forEach((link) => {
            link.classList.toggle(
                'is-active',
                link.dataset.componentLink === componentId
            )
        })
    frame.innerHTML =
        '<p class="example-empty">Loading example...</p>'
    code.textContent = 'Loading code...'

    try {
        const exampleUrl = new URL(
            `${examplesRoot}/${componentId}.html`,
            window.location.href
        )
        const response = await fetch(exampleUrl)

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
        runScripts(doc, exampleUrl)
    } catch (error) {
        frame.innerHTML = ''
        const errorMessage = document.createElement('p')
        errorMessage.className = 'example-empty'
        errorMessage.textContent = error.message
        frame.appendChild(errorMessage)
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

    if (componentNav) {
        componentNav.innerHTML = components
            .map(
                (component) =>
                    `<a href="components.html?component=${component.id}" data-component-link="${component.id}">${component.name}</a>`
            )
            .join('')
    }
}

select.addEventListener('change', () => {
    const componentId = select.value
    const nextUrl = new URL(window.location.href)
    nextUrl.searchParams.set('component', componentId)
    history.replaceState(null, '', nextUrl)
    loadExample(componentId)
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
