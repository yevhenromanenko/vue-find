import axios from "axios";
import refreshPage from "@/functions/etc/refreshPage.js";

export async function clickToExit() {
    try {
        const response = await axios.get('https://findbride.com/register/exit', {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'priority': 'u=1, i',
            },
            referrer: 'https://findbride.com/',
            referrerPolicy: 'no-referrer-when-downgrade',
            withCredentials: true
        });

        if (response.status === 200) {
            refreshPage('/girl/')
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
