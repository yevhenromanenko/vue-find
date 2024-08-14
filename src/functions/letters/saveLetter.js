
export async function saveLetter() {

    this.validateForm();
    if (!this.subject.isValid || !this.letter.isValid) {
        this.formIsValid = false;
        return;
    }

    const letterData = {
        ladyId: this.ladyId,
        subject: this.subject.val,
        letter: this.letter.val,
        photo: this.photo.val,
        video: this.video.val,
    }
    this.$store.dispatch('saveLetter', letterData);

}
