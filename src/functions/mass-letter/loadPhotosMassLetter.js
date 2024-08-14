import fetchPhotos from "@/functions/media/fetchPhotos.js";

export async function loadPhotosMassLetter() {
    try {
        this.photoLoadingMassLetter = true;

        const photos = await fetchPhotos();

        this.photosMass = photos;
        this.photoLoadingMassLetter = false;

        if (photos.length === 0) {
            this.photoErrorMassLetter = true;
        } else {
            this.photoErrorMassLetter = false;
        }

    } catch (error) {
        console.error("Ошибка при загрузке фото:", error);
        this.photoLoadingMassLetter = false;
        this.photoErrorMassLetter = true;
    }
}
