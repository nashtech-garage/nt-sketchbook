const CATEGORIES_API = 'https://lucide.dev/api/categories'

const formatTitle = (str) =>
    str
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')

const transformData = (data) =>
    Object.entries(data).reduce((acc, [iconName, iconCategories]) => {
        iconCategories.forEach((cat) => {
            const title = formatTitle(cat)
            if (!acc[title]) acc[title] = []
            acc[title].push(iconName)
        })
        return acc
    }, {})

const createIconCard = (iconName) => {
    const card = document.createElement('div')
    card.className = 'icon-card'

    card.setAttribute('data-nt-toggle', 'tooltip')
    card.setAttribute('data-nt-placement', 'top')
    card.setAttribute('data-nt-variant', 'danger')
    card.setAttribute('title', iconName)

    card.innerHTML = `
        <i class="nti nti-sl nti-${iconName}"></i>
    `

    return card
}

async function initGallery() {
    const gallery = document.getElementById('gallery')
    const searchInput = document.getElementById('search')

    if (!gallery || !searchInput) return

    try {
        const response = await fetch(CATEGORIES_API)
        const rawData = await response.json()
        const categories = transformData(rawData)
        const sortedCategoryNames = Object.keys(categories).sort()

        const render = (filter = '') => {
            const searchTerm = filter.toLowerCase().trim()
            const fragment = document.createDocumentFragment()
            const renderedIcons = new Set()

            sortedCategoryNames.forEach((title) => {
                const iconList = categories[title]
                const filtered = iconList.filter(
                    (name) =>
                        name.toLowerCase().includes(searchTerm) &&
                        !renderedIcons.has(name)
                )

                if (filtered.length === 0) return

                const section = document.createElement('div')
                section.className = 'category-section'
                section.innerHTML = `<h3 class="nt-text-2xl nt-mb-2">${title}</h3>`

                const grid = document.createElement('div')
                grid.className = 'icon-grid'

                filtered.forEach((iconName) => {
                    renderedIcons.add(iconName)
                    grid.appendChild(createIconCard(iconName))
                })

                section.appendChild(grid)
                fragment.appendChild(section)
            })

            gallery.innerHTML = ''
            gallery.appendChild(fragment || '<p>No icons found.</p>')
        }

        render()

        let timeout
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => render(e.target.value), 150)
        })
    } catch (err) {
        console.error('Gallery Init Failed:', err)
        gallery.innerHTML =
            '<p class="error">Failed to load icon categories.</p>'
    }
}

initGallery()
