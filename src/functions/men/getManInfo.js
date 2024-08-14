import axios from "axios";
import UseFindAccessToken from "@/functions/token/useFindAccessToken.js";

const getManInfo = async (manId) => {
    try {
        const dailyHash = localStorage.getItem('AUTH:DAILY_HASH');
        const AccessToken = UseFindAccessToken();

        if(!AccessToken.AccessToken || !dailyHash) {
            console.error('потерян AccessToken или значение daily hash не найдено в локальном хранилище.');
            return;
        }

        const res = await axios.get(`https://api.findbride.com/api/v3/users/get_information/man/${manId}.json?daily_hash=${dailyHash}`, {
            headers: {
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'authorization': `${AccessToken.AccessToken}`,
                'priority': 'u=1, i',
            },
            referrer: 'https://findbride.com/chat/online',
            referrerPolicy: 'no-referrer-when-downgrade',
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })

        const data = res.data;
        return data;

    } catch (e) {
        console.error(`GetInfMan error: ${e}`);
        return null;
    }
}

export default getManInfo;
