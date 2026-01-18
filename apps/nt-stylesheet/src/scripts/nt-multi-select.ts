import { Singleton } from '../utils/singleton'

export type Variant = 'danger' | 'success' | 'warning'

export class NtMultiSelect extends Singleton {
    private static initialized = new WeakSet<HTMLSelectElement>()
    private static debounceTimer: ReturnType<
        typeof setTimeout
    > | null = null

    private select: HTMLSelectElement
    private wrapper: HTMLDivElement
    private input: HTMLInputElement
    private tagsContainer: HTMLDivElement
    private dropdown: HTMLUListElement
    private options: HTMLOptionElement[]

    constructor(select: HTMLSelectElement) {
        super()
        this.select = select
        this.options = Array.from(select.options)

        this.select.classList.add('nt-multi-select-hidden')
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'nt-multi-select'
        this.wrapper.tabIndex = 0

        const variant = select.getAttribute('data-variant')
        if (variant) {
            this.wrapper.classList.add(`nt-multi-select-${variant}`)
        }

        const control = document.createElement('div')
        control.className = 'nt-multi-select-control'

        this.tagsContainer = document.createElement('div')
        this.tagsContainer.className = 'nt-multi-select-tags'

        this.input = document.createElement('input')
        this.input.className = 'nt-multi-select-input'
        this.input.type = 'text'
        this.input.placeholder =
            select.getAttribute('data-placeholder') || 'Select...'
        this.input.readOnly = false

        control.appendChild(this.tagsContainer)
        control.appendChild(this.input)

        this.dropdown = document.createElement('ul')
        this.dropdown.className = 'nt-multi-select-dropdown hidden'

        this.wrapper.appendChild(control)
        this.wrapper.appendChild(this.dropdown)
        this.select.after(this.wrapper)

        this.bindEvents()
        this.renderTags()
    }
    static init() {
        NtMultiSelect.enhanceAll()

        // Debounce enhanceAll to reduce CPU usage on rapid DOM changes
        const observer = new MutationObserver(() => {
            if (NtMultiSelect.debounceTimer) {
                clearTimeout(NtMultiSelect.debounceTimer)
            }
            NtMultiSelect.debounceTimer = setTimeout(() => {
                NtMultiSelect.enhanceAll()
            }, 100)
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    }

    private static enhanceAll() {
        const elements = document.querySelectorAll(
            'select[data-nt-multi-select][multiple]'
        )
        elements.forEach((el) => {
            if (
                !NtMultiSelect.initialized.has(
                    el as HTMLSelectElement
                )
            ) {
                new NtMultiSelect(el as HTMLSelectElement)
                NtMultiSelect.initialized.add(el as HTMLSelectElement)
            }
        })
    }

    private bindEvents() {
        this.input.addEventListener('input', () =>
            this.renderDropdown()
        )
        this.input.addEventListener('focus', () =>
            this.renderDropdown()
        )

        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target as Node)) {
                this.dropdown.classList.add('hidden')
            }
        })
    }

    private renderTags() {
        // Use DocumentFragment for efficient batch DOM updates
        const fragment = document.createDocumentFragment()

        const selectedOptions = this.options.filter(
            (opt) => opt.selected
        )

        selectedOptions.forEach((option) => {
            const tag = document.createElement('span')
            tag.className = 'nt-multi-select-tag'
            tag.textContent = option.text

            const removeBtn = document.createElement('button')
            removeBtn.className = 'nt-multi-select-tag-remove'
            removeBtn.type = 'button'
            removeBtn.innerHTML = '&times;'
            removeBtn.addEventListener('click', () => {
                option.selected = false
                this.renderTags()
                this.renderDropdown()
            })

            tag.appendChild(removeBtn)
            fragment.appendChild(tag)
        })

        // Clear existing content and append all at once to reduce reflows
        this.tagsContainer.textContent = ''
        this.tagsContainer.appendChild(fragment)

        if (selectedOptions.length === 0) {
            this.input.placeholder =
                this.select.getAttribute('data-placeholder') ||
                'Select...'
        } else {
            this.input.placeholder = ''
        }
    }

    private renderDropdown() {
        // Use DocumentFragment for efficient batch DOM updates
        const fragment = document.createDocumentFragment()
        const search = this.input.value.toLowerCase()

        this.options.forEach((option) => {
            if (
                option.selected ||
                (search &&
                    !option.text.toLowerCase().includes(search))
            ) {
                return
            }

            const li = document.createElement('li')
            li.className = 'nt-multi-select-dropdown-option'
            li.textContent = option.text
            li.addEventListener('click', () => {
                option.selected = true
                this.input.value = ''
                this.renderTags()
                this.renderDropdown()
            })

            fragment.appendChild(li)
        })

        // Clear existing content and append all at once to reduce reflows
        this.dropdown.textContent = ''
        this.dropdown.appendChild(fragment)

        this.dropdown.classList.toggle(
            'hidden',
            this.dropdown.childElementCount === 0
        )
    }
}
