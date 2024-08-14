
export function selectVideoMassLetter(videoId) {
    if (this.videoMassLetter.val === videoId) {
        this.videoMassLetter.val = null;
    } else {
        this.videoMassLetter.val = videoId;
    }
}
