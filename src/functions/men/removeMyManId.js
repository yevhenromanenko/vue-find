import axios from "axios";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";

const removeMyManId = async (myManSectionIds, manId, index) => {
    const ladyId = getUserToken();

    const res = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`);
    const resData = res.data;

    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            if (resKey && resKey.user && resKey.user.manId === manId) {
                await axios.delete(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}/${key}.json`);
                break;
            }
        }
    }

    myManSectionIds.splice(index, 1);
}

export default removeMyManId;
