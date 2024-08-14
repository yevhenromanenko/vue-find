import axios from "axios";
import getManInfo from "@/functions/men/getManInfo.js";
import {useInfoAboutMan} from "@/functions/men/useInfoAboutMan.js";

export async function addInBan(banSectionIds, manId, ladyId) {
    if (manId) {
        const getInfo = await getManInfo(manId);

        if (getInfo === null) {
            console.log('не було знайдено на сайті, не змогли додати у бан');
        } else {
            const isBanMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${ladyId}.json`);
            const resData = await isBanMenFromServer.data;
            let isBanUserOnServer = false;

            if (resData) {
                for (const key in resData) {
                    const resKey = resData[key];
                    if (String(resKey.user.manId) === String(manId)) {
                        isBanUserOnServer = true;
                        break;
                    }
                }
            }

            if (isBanUserOnServer) {
                console.log(`${getInfo.name} уже находится в списке банов.`);
            } else {
                const user = useInfoAboutMan(getInfo);
                await axios.post(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${ladyId}.json`, { user });
                banSectionIds.push(user);
            }
        }
    }
}
