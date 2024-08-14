
export function selectPhotoMassLetter(photoId) {
    if (this.photoMassLetter.val === photoId) {
        this.photoMassLetter.val = null;
    } else {
        this.photoMassLetter.val = photoId;
    }
}
