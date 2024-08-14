import UseFindAccessToken from "@/functions/token/useFindAccessToken.js";
import API_SITE_DOMEIN from "@/functions/API_SITE_DOMEIN.js";
import axios from "axios";

const newChatFromFind = async () => {
    const AccessToken = UseFindAccessToken();
    try {
        const res = await axios.get(`${API_SITE_DOMEIN}/api/v3/chat/get-unread-messages`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AccessToken.AccessToken
            }
        });
        const data = res.data;
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default newChatFromFind;
