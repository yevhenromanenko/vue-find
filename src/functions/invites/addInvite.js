
export function addInvite() {
    this.$store.dispatch('addInvite', {
        ladyId: this.ladyId,
        text: this.$refs.inviteInput.value,
        isMyMan: this.isMyMan,
        isBirthday: this.isBirthday,
        isPhoto: this.isPhoto,
        isNoPhoto: this.isNoPhoto
    });

    this.inviteText = '';
    this.inviteType = '';
}
