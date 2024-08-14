import fetchVideos from "@/functions/media/fetchVideos.js";

export async function loadVideos() {
    try {
        this.videoLoading = true;

        const videos = await fetchVideos();

        this.videos = videos;
        this.videoLoading = false;

        if (videos.length === 0) {
            this.videoError = true;
        } else {
            this.videoError = false;
        }

    } catch (error) {
        console.error("Ошибка при загрузке видео:", error);
        this.videoLoading = false;
        this.videoError = true;
    }
}
