import axios from "axios";

export async function getUnreadCount() {
    try {
        const response = await axios.get('https://findbride.com/mess', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'max-age=0',
                'priority': 'u=0, i',
                'upgrade-insecure-requests': '1'
            },
            referrer: 'https://findbride.com/',
            referrerPolicy: 'no-referrer-when-downgrade',
            withCredentials: true
        });
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        const element = doc.querySelector('.mailbox-num');

        if (element) {
            this.unreadCount = element.textContent.trim();
        } else {
            this.unreadCount = null;
        }
    } catch (error) {
        console.error('Error fetching unread count:', error);
    }
}
