import getManInfo from "@/functions/men/getManInfo.js";
import { useInfoAboutMan } from "@/functions/men/useInfoAboutMan.js";
import axios from "axios";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";

const addMyManFromIncomingChat = async (myManSectionIds, manId) => {
    const getInfo = await getManInfo(manId);
    const ladyId = getUserToken();
    const user = useInfoAboutMan(getInfo);
    let isUserOnServer = false;


    const res = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`);
    const resData = res.data;

    console.log(resData, 'resData users on server');

    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            if (resKey && resKey.user && resKey.user.manId === user.manId) {
                isUserOnServer = true;
                break;
            }
        }
    }

    if (!isUserOnServer) {
        console.log('Добавляем пользователя');
        await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`, { user });
    } else {
        console.log('Пользователь уже на сервере');
    }
}

export default addMyManFromIncomingChat;
