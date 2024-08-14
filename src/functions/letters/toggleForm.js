
export function toggleForm(type) {
    if (type === 'bday') {
        this.showBdayForm = !this.showBdayForm;
        this.showOnlineForm = false;
    } else if (type === 'online') {
        this.showOnlineForm = !this.showOnlineForm;
        this.showBdayForm = false;
    }
}
