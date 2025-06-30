document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', async (e) => {
        e.preventDefault()
        const url = e.currentTarget.getAttribute('href')
        const mainContent = document.getElementById('main-content')
        if (!url || !mainContent) return

        try {
            const response = await fetch(url)
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`)

            const text = await response.text()
            const doc = new DOMParser().parseFromString(
                text,
                'text/html'
            )
            const newMain = doc.querySelector('main')

            if (newMain) {
                mainContent.innerHTML = newMain.innerHTML

                document
                    .querySelectorAll('.indeterminate')
                    .forEach((el) => {
                        if (
                            el instanceof HTMLInputElement &&
                            el.type === 'checkbox'
                        ) {
                            el.indeterminate = true
                        }
                    })
            } else {
                mainContent.innerHTML = `<p class="text-red-500">Could not load content from ${url}</p>`
            }
        } catch (err) {
            mainContent.innerHTML = `<p class="text-red-500">Error loading ${url}</p>`
            console.error(err)
        }
    })
})
