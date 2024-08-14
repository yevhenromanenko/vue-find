import getUserToken from "@/functions/token/getLadyIdFromCookies.js";
import axios from "axios";

const removeBanId = async (banSectionIds, manId, index) => {
    const ladyId = getUserToken();

    const res = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${ladyId}.json`);
    const resData = res.data;

    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            if (resKey && resKey.user && resKey.user.manId === manId) {
                await axios.delete(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${ladyId}/${key}.json`);
                break;
            }
        }
    }

    banSectionIds.splice(index, 1);

}

export default removeBanId;
