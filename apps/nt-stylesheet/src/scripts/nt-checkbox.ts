export class NtCheckBox {
    static init() {
        const indeterminateIds = ['indeterminate', 'indeterminate-disabled'];
        indeterminateIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                (element as HTMLInputElement).indeterminate = true;
            }
        });
    }
}
