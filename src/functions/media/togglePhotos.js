
export function togglePhotos() {
    this.showPhotos = !this.showPhotos;
    if (this.showPhotos && this.photos.length === 0) {
        this.loadPhotos();
    }
}
