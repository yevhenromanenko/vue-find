import axios from "axios";

const getUserIdFromMainPage = async () => {
    try {
        const response = await axios.get('https://findbride.com/main', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'priority': 'u=0, i',
                'upgrade-insecure-requests': '1'
            },
            referrer: 'https://findbride.com/main',
            referrerPolicy: 'no-referrer-when-downgrade',
            withCredentials: true
        });

        const html = response.data;
        const userIdMatch = html.match(/user_id\s*=\s*'(\d+)'/);

        if (userIdMatch) {
            const userId = userIdMatch[1];
            return userId
        }

    } catch (error) {
        console.error('Error fetching ladyId:', error);
    }
}

export default getUserIdFromMainPage;
