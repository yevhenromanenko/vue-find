import axios from "axios";

export async function getBanMenFromServer() {
    const isBanMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/ban-men/${this.ladyId}.json`);
    const resData = await isBanMenFromServer.data;
    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            this.banSectionIds.push(resKey.user)
        }
    }
}
