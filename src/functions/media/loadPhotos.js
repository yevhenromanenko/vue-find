import fetchPhotos from "@/functions/media/fetchPhotos.js";

export async function loadPhotos() {
    try {
        this.photoLoading = true;

        const photos = await fetchPhotos();

        this.photos = photos;
        this.photoLoading = false;

        if (photos.length === 0) {
            this.photoError = true;
        } else {
            this.photoError = false;
        }

    } catch (error) {
        console.error("Ошибка при загрузке фото:", error);
        this.photoLoading = false;
        this.photoError = true;
    }
}
