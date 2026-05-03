const examplePage = document.querySelector('.nt-page')

const formatMarkup = (html) =>
    html
        .replace(/></g, '>\n<')
        .replace(/\n\s*\n/g, '\n')
        .trim()

if (examplePage) {
    const codeSection = document.createElement('section')
    codeSection.className = 'example-code-section'
    codeSection.setAttribute('aria-labelledby', 'example-code-title')
    codeSection.innerHTML = `
        <div class="example-code-header">
            <h2 class="example-code-title" id="example-code-title">HTML</h2>
            <button class="nt-button-outline nt-button-primary" id="copy-example-code" type="button">Copy</button>
        </div>
        <pre class="example-code-block"><code></code></pre>
    `

    const code = codeSection.querySelector('code')
    const copyButton = codeSection.querySelector('#copy-example-code')
    code.textContent = formatMarkup(examplePage.outerHTML)
    examplePage.after(codeSection)

    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(code.textContent)
            copyButton.textContent = 'Copied'
        } catch {
            copyButton.textContent = 'Copy failed'
        }

        window.setTimeout(() => {
            copyButton.textContent = 'Copy'
        }, 1600)
    })
}
