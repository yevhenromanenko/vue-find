
export function selectVideo(videoId) {
    if (this.video.val === videoId) {
        this.video.val = null;
    } else {
        this.video.val = videoId;
    }
}
