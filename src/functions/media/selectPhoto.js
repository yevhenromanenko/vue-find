
export function selectPhoto(photoId) {
    if (this.photo.val === photoId) {
        this.photo.val = null;
    } else {
        this.photo.val = photoId;
    }
}
