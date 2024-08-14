
export async function loadInvites() {
    this.isLoading = true;
    try {
        await this.$store.dispatch('loadInvites');
    } catch (error) {
        this.error = 'Сталась помилка, спробуйте пізніше, перевірте інтернет зʼєднання або перезавантажте сторінку!';
    }
    this.isLoading = false;
}
