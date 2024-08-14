import axios from "axios";

export async function getMyMenFromServerMassLetter(ladyId) {
    const isMyMenFromServer = await axios.get(`https://find-db-default-rtdb.europe-west1.firebasedatabase.app/men/${ladyId}.json`);
    const resData = await isMyMenFromServer.data;
    const myManSectionIdsMassLetter = [];
    if (resData) {
        for (const key in resData) {
            const resKey = resData[key];
            myManSectionIdsMassLetter.push(resKey.user)
        }

        return myManSectionIdsMassLetter;
    }
}
