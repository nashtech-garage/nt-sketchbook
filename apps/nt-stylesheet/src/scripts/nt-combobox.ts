export type Placement = 'top' | 'bottom' | 'left' | 'right'
export type Variant =
    | 'default'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'

export class NtCombobox {
    private static instance: NtCombobox | undefined
    private isComboboxOpen: boolean

    static getInstance(): NtCombobox {
        if (!this.instance) this.instance = new NtCombobox()
        return this.instance
    }

    static init() {
        this.getInstance()
    }

    constructor(isComboboxOpen = false) {
        this.isComboboxOpen = isComboboxOpen
        document.addEventListener(
            'click',
            this.toggleDropdown?.bind(this)
        )
    }

    private toggleDropdown() {
        const dropdown = document.querySelector<HTMLDivElement>(
            '.nt-combobox-popover'
        )
        const button = document.querySelector<HTMLButtonElement>(
            '.nt-combobox-trigger'
        )
        const input = document.querySelector<HTMLInputElement>(
            '.nt-combobox-input'
        )
        if (this.isComboboxOpen) {
            dropdown?.classList.remove('show')
            button?.classList.remove('active')
            this.isComboboxOpen = false
        } else {
            dropdown?.classList.add('show')
            button?.classList.add('active')
            this.isComboboxOpen = true
            // Focus on search input when opened
            input?.focus()
        }
    }

    //     function selectOption(option) {
    //     const button = document.querySelector(".nt-combobox-trigger");
    //     const dropdown = document.querySelector(".nt-combobox-popover");
    //     const links = dropdown.querySelector(".nt-combobox-list").querySelectorAll('.nt-combobox-list-item');
    //     button.textContent = option;
    //     links.forEach((link) => {
    //       if(link.textContent === option){
    //         link.classList.add('selected-item')
    //       } else {
    //         link.classList.remove('selected-item')
    //       }
    //     })
    //     // Close dropdown
    //     // toggleDropdown();
    //     // Clear search
    //     const input = document.querySelector('.nt-combobox-input')
    //     input.value = '';
    //     filterFunction();
    // }
    // private filterFunction() {
    //     const dropdown = document.querySelector<HTMLDivElement>(".nt-combobox-popover");
    //         const input = document.querySelector<HTMLInputElement>('.nt-combobox-input')
    //         const filter = input?.value.toLowerCase() ?? '';
    //         const links = dropdown?.querySelector<HTMLDivElement>(".nt-combobox-list")?.querySelectorAll<HTMLElement>('.nt-combobox-list-item') || [];
    //         let hasVisibleItems = false;

    //         for (let i = 0; i < links.length; i++) {
    //             const txtValue = links[i].textContent || links[i].innerText;
    //             if (txtValue.toLowerCase().indexOf(filter) > -1) {
    //                 links[i].style.display = "";
    //                 hasVisibleItems = true;
    //             } else {
    //                 links[i].style.display = "none";
    //             }
    //         }

    //         // Show/hide no results message
    //         let noResultsMsg = dropdown?.querySelector('.no-results');
    //         if (!hasVisibleItems && filter !== '') {
    //             if (!noResultsMsg) {
    //                 noResultsMsg = document.createElement('div');
    //                 noResultsMsg.className = 'no-results';
    //                 noResultsMsg.textContent = 'No results found';
    //                 dropdown?.appendChild(noResultsMsg);
    //             }
    //             noResultsMsg.style.display = 'block';
    //         } else if (noResultsMsg) {
    //             noResultsMsg.style.display = 'none';
    //         }
    // }
}
