import axios from "axios";
import cheerio from "cheerio";

async function fetchProfileData(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "priority": "u=0, i",
                "upgrade-insecure-requests": "1"
            },
            referrerPolicy: "no-referrer-when-downgrade",
            method: "GET",
            mode: "cors",
            credentials: "include"
        });

        const $ = cheerio.load(response.data);
        const profileAvatar = $('.profile-avatar img');
        const imageUrl = profileAvatar.attr('src');
        const name = profileAvatar.attr('alt');

        return { imageUrl, name };
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }
}

export default fetchProfileData;
