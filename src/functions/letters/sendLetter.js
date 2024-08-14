import axios from 'axios';
import SITE_DOMEIN from "@/functions/SITE_DOMEIN.js";

async function sendLetter(manId, formData) {
    try {
        const response = await axios.post(`${SITE_DOMEIN}/mess/send/all/${manId}/1`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryBlk1bY7I3vekslsQ',
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'priority': 'u=1, i',
            },
            referrer: 'https://findbride.com/chat/',
            referrerPolicy: 'no-referrer-when-downgrade',
            credentials: 'include'
        });
        if (response.status === 200) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default sendLetter;
