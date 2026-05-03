const getCurrentPagePath = () => {
    const page = window.location.pathname.split('/').pop()
    return page || 'index.html'
}

const getLinkPagePath = (link) => {
    const url = new URL(
        link.getAttribute('href'),
        window.location.href
    )
    const page = url.pathname.split('/').pop()
    return page || 'index.html'
}

const setActiveSidebarLink = (sectionId) => {
    const currentPage = getCurrentPagePath()
    Links.forEach((link) => {
        const url = new URL(
            link.getAttribute('href'),
            window.location.href
        )
        const isSamePage = getLinkPagePath(link) === currentPage
        const isActive =
            isSamePage && url.hash.replace('#', '') === sectionId

        link.classList.toggle('is-active', isActive)
        if (isActive) {
            link.setAttribute('aria-current', 'true')
        } else {
            link.removeAttribute('aria-current')
        }
    })
}

const getSectionFromHash = () =>
    decodeURIComponent(window.location.hash.replace('#', ''))

const activateInitialSidebarLink = () => {
    const sectionId = getSectionFromHash()

    if (sectionId) {
        setActiveSidebarLink(sectionId)
        return
    }

    const firstSection = document.querySelector('section[id]')
    if (firstSection) {
        setActiveSidebarLink(firstSection.id)
    }
}

const observeSections = () => {
    const sections = [...document.querySelectorAll('section[id]')]

    if (!sections.length) return

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        a.boundingClientRect.top -
                        b.boundingClientRect.top
                )

            if (visible[0]?.target?.id) {
                setActiveSidebarLink(visible[0].target.id)
            }
        },
        {
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        }
    )

    sections.forEach((section) => observer.observe(section))
}

window.addEventListener('hashchange', activateInitialSidebarLink)
activateInitialSidebarLink()
observeSections()
