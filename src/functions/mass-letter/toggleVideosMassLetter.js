

export function toggleVideosMassLetter() {
    this.showVideosMassLetter = !this.showVideosMassLetter;
    if (this.showVideosMassLetter && this.videosMassLetter.length === 0) {
        this.loadVideosMassLetter();
    }
}
