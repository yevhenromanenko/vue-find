
export function toggleVideos() {
    this.showVideos = !this.showVideos;
    if (this.showVideos && this.videos.length === 0) {
        this.loadVideos();
    }
}
