import axios from "axios";
import UseFindAccessToken from "@/functions/token/useFindAccessToken.js";
import {addInBan} from "@/functions/men/addInBan.js";

const sendInvite = async (manId, invite, banSectionIds, ladyId, errorInvite, manyMessagesSent) => {
    const AccessToken = UseFindAccessToken();

    if(!AccessToken.AccessToken) {
        console.error('потерян AccessToken');
        return null;
    }

    const url = `https://api.findbride.com/api/v3/chat/send-message-to/${manId}`;
    const headers = {
        "accept": "*/*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": `${AccessToken.AccessToken}`,
        "content-type": "application/json",
        "priority": "u=1, i",
    };
    const referrer = "https://findbride.com/";
    const referrerPolicy = "strict-origin-when-cross-origin";
    const body = {
        "content_type": "text",
        "content": `${invite}`
    };

    try {
      await axios.post(url, body, { headers, referrer, referrerPolicy });
      return true;

    } catch (err) {
        errorInvite++;
        if (err.response && err.response.status === 451) {
            await addInBan(banSectionIds, manId, ladyId)
        } else if (err.response && err.response.status === 423) {
            console.log(`Чоловік ${manId} оффлайн зараз!`)
        } else if (err.response && err.response.status === 429) {
            manyMessagesSent.push(manId);
            console.log(`Додаємо ${manId} в бан на 30 хв!`);
        } else {
            console.error(err);
        }
        return false;
    }
}

export default sendInvite;
