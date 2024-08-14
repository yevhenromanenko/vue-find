import axios from "axios";
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";

const fetchPhotos = async () => {
    const response = await axios.get(`${SITE_DOMEIN}/media-center?filter=photo`, {
        headers: {
            "accept": "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "priority": "u=1, i",
        },
        referrer: "https://findbride.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        method: "GET",
        mode: "cors",
        credentials: "include"
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    const photoElements = doc.querySelectorAll('.item-status-approved');

    const photos = Array.from(photoElements).map(el => ({
        id: el.getAttribute('data-file-id'),
        url: el.querySelector('[data-popup-slider-photo-video] > a').getAttribute('href')
    }));

    if (photos.length > 0) {
        return photos;
    } else {
        return [];
    }
}

export default fetchPhotos;
