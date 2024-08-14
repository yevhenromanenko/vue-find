import axios from "axios";

export async function getMyMenFromServer() {
    const isMyMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${this.ladyId}.json`);
    const resData = await isMyMenFromServer.data;
    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            this.myManSectionIds.push(resKey.user)
        }
    }
}
