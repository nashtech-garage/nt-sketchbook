async function initGallery() {
    const gallery = document.getElementById('gallery')
    const searchInput = document.getElementById('search')

    try {
        const response = await fetch(
            '../assets/icons/icon-categories.json'
        )
        const tagsData = await response.json()

        const categories = {}
        for (const [iconName, tags] of Object.entries(tagsData)) {
            tags.forEach((tag) => {
                if (!isNaN(tag) || tag.length < 3) return
                if (!categories[tag]) categories[tag] = []
                categories[tag].push(iconName)
            })
        }

        const sortedCategoryNames = Object.keys(categories).sort()

        function render(filter = '') {
            gallery.innerHTML = ''
            const searchTerm = filter.toLowerCase()
            const renderedIcons = new Set()

            sortedCategoryNames.forEach((category) => {
                const filteredIcons = categories[category].filter(
                    (icon) =>
                        icon.includes(searchTerm) &&
                        !renderedIcons.has(icon)
                )

                if (filteredIcons.length === 0) return

                const section = document.createElement('div')
                section.className = 'category-section'
                const title =
                    category.charAt(0).toUpperCase() +
                    category.slice(1)
                section.innerHTML = `<h3>${title}</h3><div class="icon-grid"></div>`

                const grid = section.querySelector('.icon-grid')
                filteredIcons.forEach((iconName) => {
                    renderedIcons.add(iconName)
                    const card = document.createElement('div')
                    card.className = 'icon-card'
                    card.innerHTML = `<i class="nti nti-${iconName}"></i><span>${iconName}</span>`
                    card.onclick = () => {
                        navigator.clipboard.writeText(
                            `<i class="nti nti-${iconName}"></i>`
                        )
                        alert(`Copied: ${iconName}`)
                    }
                    grid.appendChild(card)
                })
                gallery.appendChild(section)
            })
        }

        render()
        searchInput.addEventListener('input', (e) =>
            render(e.target.value)
        )
    } catch (err) {
        console.error('Failed to load icons:', err)
    }
}

initGallery()
