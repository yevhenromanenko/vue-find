
export function togglePhotosMassLetter() {
    this.showPhotosMassLetter = !this.showPhotosMassLetter;
    if (this.showPhotosMassLetter && this.photosMassLetter.length === 0) {
        this.loadPhotosMassLetter();
    }
}
