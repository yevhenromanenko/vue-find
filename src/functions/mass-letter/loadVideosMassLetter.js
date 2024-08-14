
import fetchVideos from "@/functions/media/fetchVideos.js";

export async function loadVideosMassLetter() {
    try {
        this.videoLoadingMassLetter = true;

        const videos = await fetchVideos();

        this.videosMass = videos;
        this.videoLoadingMassLetter = false;

        if (videos.length === 0) {
            this.videoErrorMassLetter = true;
        } else {
            this.videoErrorMassLetter = false;
        }

    } catch (error) {
        console.error("Ошибка при загрузке видео:", error);
        this.videoLoadingMassLetter = false;
        this.videoErrorMassLetter = true;
    }
}
