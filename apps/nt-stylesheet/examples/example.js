const updateVersion = () => {
    return fetch('package.json')
        .then((res) => res.json())
        .then((data) => {
            const skdVersionEl =
                document.getElementById('sdk-version')
            if (skdVersionEl) {
                skdVersionEl.innerText = data.version
            }
        })
}

const renderComponentsList = (data) => {
    const title = document.getElementById('nt-widget-title')
    const list = document.getElementById('nt-widget-list')
    list.innerHTML = ''

    const sortedComponents = data.components.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base'
        })
    )

    sortedComponents.forEach((item) => {
        const li = document.createElement('li')
        const a = document.createElement('a')

        li.className = 'nt-navbar-secondary-item'
        li.id = item.id

        if (item.icon) {
            const span = document.createElement('span')
            span.classList = `nt-navbar-item-icon nti ${item.icon}`
            li.appendChild(span)
        }

        a.innerText = item.name
        a.href = `javascript:void(0)`

        li.appendChild(a)
        list.appendChild(li)
    })

    title.innerText = `${title.innerText} - v${data.version}`
}

const initWidgetsList = () => {
    return fetch('../components-manifest.json')
        .then((res) => res.json())
        .then((data) => renderComponentsList(data))
}

const initMenu = () => {
    const items = document.getElementsByClassName('nt-navbar-item')
    if (items.length) {
        Array.from(items).forEach((el) => {
            el.onclick = () => {
                setMainMenuItemActive(el)
            }

            initSubMenu(el)
        })
    }
    return true
}

const initSubMenu = (menu) => {
    const items = menu.getElementsByClassName(
        'nt-navbar-secondary-item'
    )

    if (items.length) {
        Array.from(items).forEach((item) => {
            item.onclick = () => {
                const activated =
                    menu.getElementsByClassName('active')

                if (activated) {
                    Array.from(activated).forEach(
                        (el) =>
                            (el.className =
                                'nt-navbar-secondary-item')
                    )
                }

                item.className = 'nt-navbar-secondary-item active'
                renderContent(`examples/${item.id}.html`)
            }
        })
    }
    return true
}

const setMainMenuItemActive = (el) => {
    const activated = document.getElementsByClassName(
        'nt-navbar-item active'
    )

    if (activated.length) {
        Array.from(activated).forEach((item) => {
            let className = 'nt-navbar-item'

            if (item.className.indexOf('nt-navbar-primary') > -1) {
                className = `${className} nt-navbar-primary`
            }

            item.className = className
        })
    }

    let activeClassName = 'nt-navbar-item active'

    if (el.className.indexOf('nt-navbar-primary') > -1) {
        activeClassName = `nt-navbar-primary ${activeClassName} open`
    }

    el.className = activeClassName
}

const renderContent = async (url) => {
    const mainContainer = document.getElementById('main-container')
    try {
        const response = await fetch(url)
        const text = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        const newPage = doc.querySelector('.nt-page')

        if (newPage) {
            mainContainer.innerHTML = newPage.innerHTML
        } else {
            mainContainer.innerHTML = `<p class="text-red-500">Could not load content from ${url}</p>`
        }
    } catch (error) {
        const errorMessage =
            error.message || 'An unknown error occurred'
        mainContainer.innerHTML = `<p class="text-red-500">Error loading ${url}: ${errorMessage}</p>`
    }
}

updateVersion()
initWidgetsList().then(initMenu)
